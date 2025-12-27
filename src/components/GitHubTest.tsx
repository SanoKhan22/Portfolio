"use client";

import { useGitHubRepos, useGitHubStats } from "@/hooks/useGitHub";

export default function GitHubTest() {
  const { repos, isLoading: reposLoading } = useGitHubRepos();
  const { stats, isLoading: statsLoading } = useGitHubStats();

  if (reposLoading || statsLoading) {
    return (
      <div className="p-8 bg-muted/50 rounded-lg">
        <p className="text-foreground">Loading GitHub data...</p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-muted/50 rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-foreground">GitHub API Test</h2>

      {/* Stats */}
      {stats && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Stats</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-background/50 p-4 rounded">
              <p className="text-sm text-muted">Total Repos</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.totalRepos}
              </p>
            </div>
            <div className="bg-background/50 p-4 rounded">
              <p className="text-sm text-muted">Total Stars</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.totalStars}
              </p>
            </div>
            <div className="bg-background/50 p-4 rounded">
              <p className="text-sm text-muted">Total Forks</p>
              <p className="text-2xl font-bold text-foreground">
                {stats.totalForks}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Languages */}
      {stats && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Top Languages</h3>
          <div className="space-y-2">
            {Object.entries(stats.languageStats)
              .sort(([, a], [, b]) => b.percentage - a.percentage)
              .slice(0, 5)
              .map(([lang, data]) => (
                <div key={lang} className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: data.color }}
                  />
                  <span className="text-foreground font-medium">{lang}</span>
                  <span className="text-muted text-sm">
                    {data.percentage.toFixed(1)}%
                  </span>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Repos */}
      {repos && (
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            Production Repos ({repos.length})
          </h3>
          <div className="grid gap-3">
            {repos.slice(0, 5).map((repo) => (
              <div
                key={repo.name}
                className="bg-background/50 p-4 rounded space-y-1"
              >
                <h4 className="font-semibold text-foreground">{repo.name}</h4>
                <p className="text-sm text-muted">{repo.description}</p>
                <div className="flex gap-4 text-xs text-muted">
                  <span>⭐ {repo.stargazerCount}</span>
                  <span>🍴 {repo.forkCount}</span>
                  {repo.primaryLanguage && (
                    <span
                      style={{ color: repo.primaryLanguage.color }}
                      className="font-medium"
                    >
                      {repo.primaryLanguage.name}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
