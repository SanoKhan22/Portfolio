import { NextResponse } from "next/server";
import { graphql } from "@octokit/graphql";
import { Octokit } from "@octokit/rest";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Helper function to count dependencies from package.json or pubspec.yaml
async function getDependencyCount(owner: string, repo: string): Promise<number> {
  try {
    // Try package.json first (for JS/TS projects)
    try {
      const { data } = await octokit.rest.repos.getContent({
        owner,
        repo,
        path: 'package.json',
      });
      
      if ('content' in data) {
        const content = Buffer.from(data.content, 'base64').toString('utf-8');
        const packageJson = JSON.parse(content);
        const deps = Object.keys(packageJson.dependencies || {}).length;
        const devDeps = Object.keys(packageJson.devDependencies || {}).length;
        return deps + devDeps;
      }
    } catch {
      // package.json not found, try pubspec.yaml for Flutter/Dart
      try {
        const { data } = await octokit.rest.repos.getContent({
          owner,
          repo,
          path: 'pubspec.yaml',
        });
        
        if ('content' in data) {
          const content = Buffer.from(data.content, 'base64').toString('utf-8');
          // Simple YAML parsing for dependencies section
          const depsMatch = content.match(/^dependencies:\s*\n((?:  .+\n)*)/m);
          const devDepsMatch = content.match(/^dev_dependencies:\s*\n((?:  .+\n)*)/m);
          
          const depsCount = depsMatch ? depsMatch[1].split('\n').filter(line => line.trim() && !line.trim().startsWith('#')).length : 0;
          const devDepsCount = devDepsMatch ? devDepsMatch[1].split('\n').filter(line => line.trim() && !line.trim().startsWith('#')).length : 0;
          
          return depsCount + devDepsCount;
        }
      } catch {
        // Neither file found
        return 0;
      }
    }
  } catch (error) {
    console.error(`Error fetching dependencies for ${repo}:`, error);
    return 0;
  }
  
  return 0;
}

const PRODUCTION_REPOS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      repositories(
        first: 100
        privacy: PUBLIC
        orderBy: { field: UPDATED_AT, direction: DESC }
        ownerAffiliations: OWNER
      ) {
        nodes {
          name
          description
          url
          homepageUrl
          openGraphImageUrl
          primaryLanguage {
            name
            color
          }
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history {
                  totalCount
                }
              }
            }
          }
          stargazerCount
          forkCount
          updatedAt
          createdAt
          pushedAt
          refs(refPrefix: "refs/heads/", first: 100) {
            totalCount
          }
          releases {
            totalCount
          }
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const response: any = await graphqlWithAuth(PRODUCTION_REPOS_QUERY, {
      username: "SanoKhan22",
    });

    const repos = response.user.repositories.nodes;

    // Filter for repos with "production" or "feat" topics
    const filteredRepos = repos.filter((repo: any) => {
      const topics = repo.repositoryTopics.nodes.map(
        (topic: any) => topic.topic.name.toLowerCase()
      );
      return topics.includes("production") || topics.includes("feat");
    });

    // Fetch dependency counts for each repo (in parallel)
    const featuredRepos = await Promise.all(
      filteredRepos.map(async (repo: any) => {
        // Calculate total code size from all languages (in bytes)
        const totalCodeSize = repo.languages?.edges?.reduce(
          (sum: number, lang: any) => sum + (lang.size || 0),
          0
        ) || 0;
        
        // Fetch real dependency count from package.json/pubspec.yaml
        const dependencyCount = await getDependencyCount("SanoKhan22", repo.name);
        
        console.log(`[GitHub API] ${repo.name} - Branches: ${repo.refs?.totalCount}, Dependencies: ${dependencyCount}, Code size: ${totalCodeSize} bytes`);
        
        return {
          ...repo,
          commitCount: repo.defaultBranchRef?.target?.history?.totalCount || 0,
          branchCount: repo.refs?.totalCount || 0,
          dependencyCount: dependencyCount,
          releaseCount: repo.releases?.totalCount || 0,
          codeSize: totalCodeSize,
        };
      })
    );

    // Sort by commits and limit to top 3
    const sortedRepos = featuredRepos
      .sort((a: any, b: any) => b.commitCount - a.commitCount)
      .slice(0, 3);

    // Debug logging
    console.log(`[GitHub API] Filtered ${sortedRepos.length} repos from ${repos.length} total`);
    console.log('[GitHub API] Featured repos:', sortedRepos.map((r: any) => ({ 
      name: r.name, 
      commits: r.commitCount,
      branches: r.branchCount,
      dependencies: r.dependencyCount,
      topics: r.repositoryTopics.nodes.map((t: any) => t.topic.name)
    })));

    return NextResponse.json({ repos: sortedRepos });
  } catch (error: any) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch repos" },
      { status: 500 }
    );
  }
}
