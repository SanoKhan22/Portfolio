import { NextResponse } from "next/server";
import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN}`,
  },
});

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
    const featuredRepos = repos
      .filter((repo: any) => {
        const topics = repo.repositoryTopics.nodes.map(
          (topic: any) => topic.topic.name.toLowerCase()
        );
        return topics.includes("production") || topics.includes("feat");
      })
      .map((repo: any) => ({
        ...repo,
        commitCount: repo.defaultBranchRef?.target?.history?.totalCount || 0,
      }))
      .sort((a: any, b: any) => b.commitCount - a.commitCount)
      .slice(0, 3); // Limit to top 3 repos

    // Debug logging
    console.log(`[GitHub API] Filtered ${featuredRepos.length} repos from ${repos.length} total`);
    console.log('[GitHub API] Featured repos:', featuredRepos.map((r: any) => ({ 
      name: r.name, 
      commits: r.commitCount,
      topics: r.repositoryTopics.nodes.map((t: any) => t.topic.name)
    })));

    return NextResponse.json({ repos: featuredRepos });
  } catch (error: any) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch repos" },
      { status: 500 }
    );
  }
}
