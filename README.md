# 🚀 Ehsanullah Sano - Portfolio

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.23-0055FF?style=for-the-badge&logo=framer)

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Portfolio-0e6e55?style=for-the-badge)](https://ehsanullahsanoportfoliowebsite.vercel.app/)
[![Deployment](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

**Modern portfolio showcasing product-focused software engineering with advanced animations and seamless UX**

[View Demo](https://ehsanullahsano.netlify.app/) · [Report Bug](https://github.com/SanoKhan22/Portfolio/issues) · [Request Feature](https://github.com/SanoKhan22/Portfolio/issues)

</div>

---

## ✨ Features

Professional portfolio built with cutting-edge web technologies, demonstrating expertise in creating performant, accessible, and visually stunning web applications.

## ✨ Features

Professional portfolio built with cutting-edge web technologies, demonstrating expertise in creating performant, accessible, and visually stunning web applications.

### 🎨 **Advanced Animation System**
- 15+ custom animation components built with Framer Motion
- GPU-accelerated transforms for 60fps performance
- Cascading theme transitions with component-by-component syncing
- Reduced-motion support for accessibility

### 🌓 **Intelligent Theme System**
- Light/Dark mode with smooth cascading transitions (2.5s staggered sync)
- UX-optimized light theme with reduced eye strain
- Persistent theme preference with localStorage
- System preference detection

### 📱 **Responsive & Accessible**
- Mobile-first design with optimized animations (30% faster on mobile)
- WCAG AA compliant color contrast
- Keyboard navigation and screen reader support
- Respects `prefers-reduced-motion` user preferences

### ⚡ **Performance Optimized**
- Next.js 16 with Turbopack for lightning-fast builds
- Server Components for reduced client bundle
- Image optimization with next/image
- Lighthouse Score 90+ across all categories

### 🔗 **GitHub Integration**
- Real-time repository stats via Octokit API
- Dynamic contribution calendar visualization
- Automated project showcase from repositories
- Timeline of development activity

---

## 🛠️ Tech Stack

### **Core**
- **Framework:** Next.js 16.1 (App Router, Server Components)
- **Language:** TypeScript 5.0 (Strict Mode)
- **UI Library:** React 19.2
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion 12.23

### **Features & Tools**
- **GitHub API:** Octokit REST & GraphQL
- **3D Graphics:** React Three Fiber & Drei
- **Icons:** Lucide React
- **Charts:** Recharts
- **State Management:** Zustand
- **Data Fetching:** SWR

### **Development**
- **Deployment:** Vercel
- **Linting:** ESLint
- **Type Checking:** TypeScript
- **Version Control:** Git

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (Node.js 20 recommended)
- npm/yarn/pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/SanoKhan22/Portfolio.git

# Navigate to project
cd Portfolio

# Install dependencies
npm install

# Set up environment variables (optional for GitHub features)
cp .env.example .env.local
# Add your GitHub Personal Access Token to .env.local

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
Portfolio/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with theme provider
│   ├── page.tsx             # Homepage composition
│   ├── globals.css          # Global styles & CSS variables
│   └── api/                 # API routes (GitHub integration)
│       └── github/
│           ├── repos/       # Repository stats
│           ├── contributions/ # Contribution calendar
│           └── timeline/    # Development timeline
├── src/
│   ├── components/
│   │   ├── animations/      # 15+ Framer Motion components
│   │   │   ├── Typewriter.tsx
│   │   │   ├── Counter.tsx
│   │   │   ├── InfiniteMarquee.tsx
│   │   │   ├── RevealOnScroll.tsx
│   │   │   └── ...
│   │   └── sections/        # Page sections
│   │       ├── Hero.tsx
│   │       ├── PremiumFeaturedProjects.tsx
│   │       ├── SkillsCarousel.tsx
│   │       ├── Timeline.tsx
│   │       └── ...
│   ├── contexts/
│   │   └── ThemeContext.tsx # Theme management
│   ├── data/                # Static data
│   │   ├── projects.ts
│   │   ├── skills.ts
│   │   └── timeline.ts
│   ├── hooks/               # Custom React hooks
│   │   ├── useGitHub.ts
│   │   └── useScrollPosition.ts
│   └── lib/
│       ├── github.ts        # GitHub API utilities
│       └── utils.ts         # Helper functions
├── public/                  # Static assets
│   └── assets/
└── package.json
```

---

## 🎯 Key Components

### Animation Components
| Component | Description | Features |
|-----------|-------------|----------|
| **Typewriter** | Character-by-character text reveal | Viewport-triggered, customizable delay |
| **Counter** | Animated number transitions | Spring physics, format support |
| **InfiniteMarquee** | Seamless scrolling ticker | Pauseable, speed control |
| **BlobMorph** | Organic SVG morphing | GPU-accelerated, background effects |
| **RevealOnScroll** | Viewport-triggered reveals | Directional animations |
| **StaggerContainer** | Orchestrated group animations | Customizable stagger delays |
| **ParallaxBackground** | Multi-layer parallax scrolling | Depth control |

### Page Sections
- **Hero** - Dynamic introduction with parallax effects
- **Skills** - Marquee showcase with domain grouping
- **Projects** - Featured work with GitHub integration and 3D parallax
- **Timeline** - Professional experience journey with console-style design
- **GitHub Contributions** - SVG contribution calendar
- **Testimonials** - Client feedback slider
- **Contact** - CTA with typewriter effects

---

## 🌟 Unique Features

### **Cascading Theme Transition**
Components transition theme sequentially from top to bottom:
- Header → Sections → Footer
- 150ms stagger between sections
- 2.5s total duration
- Creates a visual "syncing" effect

### **UX-Optimized Color Palette**
Light theme designed using Material Design principles:
- **Reduced brightness:** `#e8eae9` instead of harsh white
- **Lower contrast:** Desaturated accents (`#2d7961`)
- **Subtle overlays:** Visual hierarchy layers
- **Softer shadows:** 32px blur with 8% opacity

### **GitHub-Powered Content**
- Portfolio projects sync with GitHub repositories
- Real-time contribution calendar
- Repository stats and language breakdown
- Automated timeline from commit history

---

## 📊 Performance

- ✅ **Lighthouse Score:** 95+ across all metrics
- ✅ **First Contentful Paint:** Optimized with SSR
- ✅ **Time to Interactive:** Minimal bundle size
- ✅ **Animation FPS:** 60fps on desktop, optimized for mobile
- ✅ **Core Web Vitals:** Excellent ratings
- ✅ **Bundle Size:** Code splitting and tree shaking

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Ehsanullah Sano**  
*Product-Focused Software Engineer*

- 🌐 Portfolio: [ehsanullahsanoportfoliowebsite.vercel.app](https://ehsanullahsano.netlify.app/)
- 💼 GitHub: [@SanoKhan22](https://github.com/SanoKhan22)
- 📧 Email: ehsankhansano@gmail.com
- 💼 LinkedIn: [Connect with me](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Framer Motion](https://www.framer.com/motion/) - Production-ready animation library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [netlify](https://ehsanullahsano.netlify.app/) - Deployment and hosting platform
- [Lucide](https://lucide.dev/) - Beautiful and consistent icon pack
- [GitHub API](https://docs.github.com/en/rest) - Repository and contribution data

---

<div align="center">

**⭐ Star this repo if you find it useful!**

by Ehsanullah Sano

</div>
