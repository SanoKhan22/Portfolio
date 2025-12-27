import { NextResponse } from "next/server";
import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
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
          stargazerCount
          forkCount
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

    // Filter for production repos
    const productionRepos = repos.filter((repo: any) => {
      const hasProductionTopic = repo.repositoryTopics.nodes.some(
        (topic: any) => topic.topic.name === "production"
      );
      const hasHomepage = repo.homepageUrl !== null;
      return hasProductionTopic || hasHomepage;
    });

    return NextResponse.json({ repos: productionRepos });
  } catch (error: any) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch repos" },
      { status: 500 }
    );
  }
}
