"use client";

import useSWR from "swr";
import {
  getProductionRepos,
  getContributions,
  getGitHubStats,
  type GitHubRepo,
  type GitHubContributions,
  type GitHubStats,
} from "@/lib/github";

const SWR_OPTIONS = {
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  dedupingInterval: 60000, // 1 minute
};

export function useGitHubRepos(username: string = "SanoKhan22") {
  const { data, error, isLoading, mutate } = useSWR<GitHubRepo[]>(
    `github-repos-${username}`,
    () => getProductionRepos(username),
    SWR_OPTIONS
  );

  return {
    repos: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

export function useGitHubContributions(
  username: string = "SanoKhan22",
  year: number = new Date().getFullYear()
) {
  const { data, error, isLoading, mutate } = useSWR<GitHubContributions>(
    `github-contributions-${username}-${year}`,
    () => getContributions(username, year),
    SWR_OPTIONS
  );

  return {
    contributions: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

export function useGitHubStats(username: string = "SanoKhan22") {
  const { data, error, isLoading, mutate } = useSWR<GitHubStats>(
    `github-stats-${username}`,
    () => getGitHubStats(username),
    SWR_OPTIONS
  );

  return {
    stats: data,
    isLoading,
    isError: error,
    refresh: mutate,
  };
}

// New hook for fetching all GitHub repos for timeline
export interface GitHubTimelineRepo {
  name: string;
  description: string;
  url: string;
  primaryLanguage: string;
  languages: string[];
  createdAt: string;
  type: "work" | "education" | "project" | "achievement";
  topics: string[];
  badge: string; // Badge type identifier
}

async function getGitHubTimelineRepos(): Promise<GitHubTimelineRepo[]> {
  try {
    const response = await fetch("/api/github/timeline");
    if (!response.ok) throw new Error("Failed to fetch timeline repos");
    const data = await response.json();
    return data.repos || [];
  } catch (error) {
    console.error("Error fetching timeline repos:", error);
    return [];
  }
}

export function useGitHubTimeline() {
  const { data, error, isLoading, mutate } = useSWR<GitHubTimelineRepo[]>(
    "github-timeline-repos",
    getGitHubTimelineRepos,
    {
      ...SWR_OPTIONS,
      revalidateOnMount: true,
    }
  );

  return {
    timelineRepos: data || [],
    isLoading,
    isError: error,
    refresh: mutate,
  };
}
