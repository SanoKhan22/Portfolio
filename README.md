# �� Ehsanullah Sano - Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer)


[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

Modern portfolio with 15+ animations, cascading theme transitions & GitHub integration

[View Demo](https://ehsanullahsanoportfoliowebsite.vercel.app/) · [Report Bug](https://github.com/SanoKhan22/Portfolio/issues)

</div>

---

## ⚡ Features

- 🎨 15+ custom Framer Motion animations (60fps GPU-accelerated)
- 🌓 Cascading theme transitions with component-by-component syncing
- 📱 Mobile-responsive with optimized animations (30% faster)
- ♿ WCAG AA accessible with reduced-motion support
- 🔗 Live GitHub integration (repos, contributions, timeline)
- 📊 Lighthouse 95+ performance across all metrics

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| **Framework** | Next.js 16.1 (App Router, Server Components) |
| **Language** | TypeScript 5.0 |
| **UI** | React 19.2 + Tailwind CSS v4 |
| **Animations** | Framer Motion 12.23 |
| **APIs** | Octokit (GitHub REST/GraphQL) |
| **3D** | React Three Fiber & Drei |
| **Deployment** | netlify |

---

## 🚀 Quick Start

```bash
git clone https://github.com/SanoKhan22/Portfolio.git
cd Portfolio
npm install
npm run dev  # Open http://localhost:3000
```

**Requirements:** Node.js 18+

---

## 📁 Structure

```
src/
├── components/
│   ├── animations/      # Typewriter, Counter, InfiniteMarquee, BlobMorph, etc.
│   └── sections/        # Hero, Skills, Projects, Timeline, Testimonials
├── contexts/
│   └── ThemeContext.tsx # Dark/Light theme with cascading transitions
├── data/                # projects.ts, skills.ts, timeline.ts
└── lib/                 # GitHub API utilities
```

---

## 🎯 Animation Components

| Component | Purpose | Feature |
|-----------|---------|---------|
| **Typewriter** | Text reveal | Viewport-triggered |
| **Counter** | Number animation | Spring physics |
| **InfiniteMarquee** | Scrolling ticker | GPU-accelerated |
| **BlobMorph** | SVG morphing | Organic shapes |
| **RevealOnScroll** | Reveal on scroll | Directional |
| **StaggerContainer** | Grouped animations | Orchestrated delays |
| **ParallaxBackground** | Multi-layer scroll | Depth effects |

---

## 🌟 Highlights

**Cascading Theme Transition:** Components sync theme sequentially (2.5s total) with 150ms stagger  
**UX-Optimized Light Theme:** Material Design palette with reduced eye strain  
**GitHub-Powered:** Real-time repos, contribution calendar, automated timeline

---

## 📊 Performance

✅ Lighthouse 95+ | ✅ 60fps animations | ✅ <3s TTI | ✅ Code splitting

---

## 🤝 Contributing

1. Fork → 2. Create branch → 3. Commit → 4. Push → 5. Pull Request

---

## 👨‍💻 Author

**Ehsanullah Sano** - Product-Focused Software Engineer

🌐 [Portfolio](https://ehsanullahsano.netlify.app/) | 💼 [@SanoKhan22](https://github.com/SanoKhan22) | 📧 ehsankhansano@yahoo.com

---

<div align="center">

**⭐ Star if helpful!** | MIT License


</div>
