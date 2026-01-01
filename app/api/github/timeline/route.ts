import { NextResponse } from "next/server";
import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

const ALL_REPOS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      repositories(
        first: 100
        privacy: PUBLIC
        orderBy: { field: CREATED_AT, direction: DESC }
        ownerAffiliations: OWNER
      ) {
        nodes {
          name
          description
          url
          primaryLanguage {
            name
            color
          }
          languages(first: 5, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              node {
                name
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
          createdAt
          updatedAt
          stargazerCount
          forkCount
        }
      }
    }
  }
`;

export async function GET() {
  try {
    const response: any = await graphqlWithAuth(ALL_REPOS_QUERY, {
      username: "SanoKhan22",
    });

    const repos = response.user.repositories.nodes;

    // Badge matching logic - First match wins
    const badgeMatchers = [
      { badge: "mobile", keywords: ["mobile"] },
      { badge: "ios", keywords: ["ios", "swift"] },
      { badge: "android", keywords: ["android", "kotlin"] },
      { badge: "web", keywords: ["web", "webapp", "nextjs", "react", "website"] },
      { badge: "ecommerce", keywords: ["ecommerce", "shopify", "woocommerce", "store"] },
      { badge: "portfolio", keywords: ["portfolio"] },
      { badge: "tool", keywords: ["tool", "cli", "utility", "mcp"] },
      { badge: "education", keywords: ["education", "learning", "tutorial", "course"] },
      { badge: "arvr", keywords: ["ar", "vr", "arkit", "arcore", "xr"] },
      { badge: "ai", keywords: ["ai", "ml", "openai", "llm", "machine-learning"] },
      { badge: "analytics", keywords: ["analytics", "ga4", "growth", "data"] },
      { badge: "backend", keywords: ["backend", "api", "nodejs", "firebase", "server"] },
      { badge: "general", keywords: ["general", "project"] },
    ];

    const getBadgeForRepo = (topics: string[]): string => {
      // Check each topic in order (first match wins)
      for (const topic of topics) {
        for (const matcher of badgeMatchers) {
          if (matcher.keywords.includes(topic)) {
            return matcher.badge;
          }
        }
      }
      return "default"; // No match found
    };

    // Transform repos into timeline format
    const timelineRepos = repos.map((repo: any) => {
      const topics = repo.repositoryTopics.nodes.map(
        (topic: any) => topic.topic.name.toLowerCase()
      );
      
      const languages = repo.languages.edges.map((edge: any) => edge.node.name);
      
      // Determine type based on topics/metadata (for color coding)
      let type: "work" | "education" | "project" | "achievement" = "project";
      if (topics.includes("production") || topics.includes("work")) {
        type = "work";
      } else if (topics.includes("learning") || topics.includes("tutorial")) {
        type = "education";
      } else if (repo.stargazerCount > 5 || topics.includes("featured")) {
        type = "achievement";
      }

      // Get badge (only one, first match wins)
      const badge = getBadgeForRepo(topics);

      return {
        name: repo.name,
        description: repo.description || "No description available",
        url: repo.url,
        primaryLanguage: repo.primaryLanguage?.name || "Unknown",
        languages: languages,
        createdAt: repo.createdAt,
        type: type,
        topics: topics,
        badge: badge,
      };
    });

    console.log(`[GitHub Timeline API] Fetched ${timelineRepos.length} repos`);

    return NextResponse.json({ repos: timelineRepos });
  } catch (error: any) {
    console.error("GitHub Timeline API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch timeline repos" },
      { status: 500 }
    );
  }
}
