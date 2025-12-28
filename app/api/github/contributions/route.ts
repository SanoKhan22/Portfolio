import { NextResponse } from "next/server";
import { graphql } from "@octokit/graphql";

const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${process.env.NEXT_PUBLIC_GITHUB_TOKEN}`,
  },
});

const CONTRIBUTIONS_QUERY = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              color
            }
          }
        }
      }
    }
  }
`;

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get("year") || String(new Date().getFullYear()));
    
    const from = new Date(year, 0, 1).toISOString();
    const to = new Date(year, 11, 31).toISOString();

    const response: any = await graphqlWithAuth(CONTRIBUTIONS_QUERY, {
      username: "SanoKhan22",
      from,
      to,
    });

    return NextResponse.json({
      contributions: response.user.contributionsCollection.contributionCalendar,
    });
  } catch (error: any) {
    console.error("GitHub API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch contributions" },
      { status: 500 }
    );
  }
}
