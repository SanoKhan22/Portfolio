// Client-side GitHub API wrapper using Next.js API routes

// TypeScript Interfaces
export interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  languages: {
    edges: Array<{
      size: number;
      node: {
        name: string;
        color: string;
      };
    }>;
  };
  repositoryTopics: {
    nodes: Array<{
      topic: {
        name: string;
      };
    }>;
  };
  defaultBranchRef: {
    target: {
      history: {
        totalCount: number;
      };
    };
  } | null;
  commitCount?: number;
  stargazerCount: number;
  updatedAt: string;
  createdAt: string;
  pushedAt: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface ContributionWeek {
  contributionDays: ContributionDay[];
}

export interface GitHubContributions {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languageStats: {
    [key: string]: {
      count: number;
      percentage: number;
      color: string;
    };
  };
}

// Cache utilities
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour
const CACHE_KEYS = {
  REPOS: "github_repos",
  CONTRIBUTIONS: "github_contributions",
  STATS: "github_stats",
};

function getFromCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_DURATION) {
      localStorage.removeItem(key);
      return null;
    }

    return data as T;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error("Failed to cache data:", error);
  }
}

// API Functions
export async function getProductionRepos(
  username: string = "SanoKhan22"
): Promise<GitHubRepo[]> {
  try {
    // Check cache first
    const cached = getFromCache<GitHubRepo[]>(CACHE_KEYS.REPOS);
    if (cached) return cached;

    const response = await fetch("/api/github/repos");
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const { repos } = await response.json();
    setCache(CACHE_KEYS.REPOS, repos);
    return repos;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    throw error;
  }
}

export async function getContributions(
  username: string = "SanoKhan22",
  year: number = new Date().getFullYear()
): Promise<GitHubContributions> {
  try {
    const cached = getFromCache<GitHubContributions>(CACHE_KEYS.CONTRIBUTIONS);
    if (cached) return cached;

    const response = await fetch(`/api/github/contributions?year=${year}`);
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    const { contributions } = await response.json();
    setCache(CACHE_KEYS.CONTRIBUTIONS, contributions);
    return contributions;
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    throw error;
  }
}

export async function getGitHubStats(
  username: string = "SanoKhan22"
): Promise<GitHubStats> {
  try {
    const cached = getFromCache<GitHubStats>(CACHE_KEYS.STATS);
    if (cached) return cached;

    const repos = await getProductionRepos(username);

    const totalRepos = repos.length;
    // Note: Stars and forks are removed from the new API response
    // These values are now set to 0 for backward compatibility
    const totalStars = 0;
    const totalForks = 0;

    // Calculate language statistics
    const languageMap = new Map<
      string,
      { count: number; totalSize: number; color: string }
    >();

    repos.forEach((repo) => {
      repo.languages.edges.forEach((lang) => {
        const existing = languageMap.get(lang.node.name);
        if (existing) {
          existing.count++;
          existing.totalSize += lang.size;
        } else {
          languageMap.set(lang.node.name, {
            count: 1,
            totalSize: lang.size,
            color: lang.node.color,
          });
        }
      });
    });

    const totalSize = Array.from(languageMap.values()).reduce(
      (sum, lang) => sum + lang.totalSize,
      0
    );

    const languageStats: GitHubStats["languageStats"] = {};
    languageMap.forEach((value, key) => {
      languageStats[key] = {
        count: value.count,
        percentage: (value.totalSize / totalSize) * 100,
        color: value.color,
      };
    });

    const stats: GitHubStats = {
      totalRepos,
      totalStars,
      totalForks,
      languageStats,
    };

    setCache(CACHE_KEYS.STATS, stats);
    return stats;
  } catch (error) {
    console.error("Error calculating GitHub stats:", error);
    throw error;
  }
}

// Clear all GitHub caches
export function clearGitHubCache(): void {
  if (typeof window === "undefined") return;
  
  Object.values(CACHE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
}
