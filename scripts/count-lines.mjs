#!/usr/bin/env node

/**
 * Script to count actual lines of code for GitHub repositories
 * Run: node scripts/count-lines.mjs
 */

import { Octokit } from "@octokit/rest";
import fs from "fs";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const USERNAME = "SanoKhan22";

const octokit = new Octokit({ auth: GITHUB_TOKEN });

// File extensions to count (exclude configs, assets, etc.)
const CODE_EXTENSIONS = [
  '.ts', '.tsx', '.js', '.jsx', '.py', '.java', '.dart', '.swift',
  '.c', '.cpp', '.h', '.cs', '.go', '.rs', '.php', '.rb', '.kt',
  '.sh', '.bash', '.sql', '.html', '.css', '.scss', '.sass'
];

async function getRepoFiles(owner, repo, path = '') {
  try {
    const { data } = await octokit.rest.repos.getContent({ owner, repo, path });
    let files = [];
    
    for (const item of Array.isArray(data) ? data : [data]) {
      if (item.type === 'file') {
        const ext = item.name.substring(item.name.lastIndexOf('.'));
        if (CODE_EXTENSIONS.includes(ext)) {
          files.push(item);
        }
      } else if (item.type === 'dir' && !item.path.includes('node_modules') && !item.path.includes('.git')) {
        const subFiles = await getRepoFiles(owner, repo, item.path);
        files = files.concat(subFiles);
      }
    }
    
    return files;
  } catch (error) {
    console.error(`Error reading ${path}:`, error.message);
    return [];
  }
}

async function countLines(owner, repo, file) {
  try {
    const { data } = await octokit.rest.repos.getContent({ 
      owner, 
      repo, 
      path: file.path 
    });
    
    if (data.content) {
      const content = Buffer.from(data.content, 'base64').toString('utf-8');
      const lines = content.split('\n').length;
      return lines;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}

async function analyzeRepo(owner, repo) {
  console.log(`\nAnalyzing ${repo}...`);
  
  const files = await getRepoFiles(owner, repo);
  console.log(`  Found ${files.length} code files`);
  
  let totalLines = 0;
  let fileCount = 0;
  
  for (const file of files.slice(0, 50)) { // Limit to 50 files to avoid rate limits
    const lines = await countLines(owner, repo, file);
    totalLines += lines;
    fileCount++;
    
    if (fileCount % 10 === 0) {
      console.log(`  Processed ${fileCount}/${Math.min(files.length, 50)} files...`);
    }
  }
  
  return { totalLines, fileCount, totalFiles: files.length };
}

async function main() {
  const repos = ['Portfolio', 'GitSafe-Branch-Management-Tool', 'GullyCric'];
  const results = {};
  
  for (const repo of repos) {
    const stats = await analyzeRepo(USERNAME, repo);
    results[repo] = stats;
    console.log(`  ✓ ${repo}: ${stats.totalLines} lines in ${stats.fileCount} files (${stats.totalFiles} total code files)`);
  }
  
  // Save results
  fs.writeFileSync(
    './public/repo-stats.json',
    JSON.stringify(results, null, 2)
  );
  
  console.log('\n✅ Results saved to public/repo-stats.json');
  console.log('\nSummary:');
  Object.entries(results).forEach(([repo, stats]) => {
    console.log(`  ${repo}: ${(stats.totalLines / 1000).toFixed(1)}K lines`);
  });
}

main().catch(console.error);
