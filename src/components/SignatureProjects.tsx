"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { signatureProjects } from "@/data/projects";
import { Counter } from "@/components/animations/Counter";
import { RevealOnScroll } from "@/components/animations/RevealOnScroll";

function ProjectCard({ project }: { project: typeof signatureProjects[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    y.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.article
      onMouseEnter={() => setIsHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02, z: 20 }}
      whileTap={{ scale: 0.98 }}
      className="group flex flex-col gap-3 rounded-2xl border border-[var(--color-border)] bg-[var(--surface)]/80 p-4 backdrop-blur md:gap-4 md:rounded-3xl md:p-6"
    >
      <div className="relative h-40 overflow-hidden rounded-xl border border-[var(--color-border)]/70 bg-black/30 md:h-48 md:rounded-2xl">
        <Image
          src={project.media}
          alt={project.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/70 to-transparent p-3 text-[10px] text-white md:p-4 md:text-xs">
          <span>{project.platform}</span>
          <span>{project.tech.slice(0, 2).join(" · ")}</span>
        </div>
      </div>
      <div className="space-y-2 md:space-y-3">
        <h3 className="font-display text-xl text-white md:text-2xl">{project.name}</h3>
        <p className="text-xs text-[var(--color-muted)] md:text-sm">{project.problem}</p>
        <p className="text-xs text-white/90 md:text-sm">{project.solution}</p>
        <div className="flex flex-wrap gap-1.5 text-[10px] text-[var(--color-muted)] md:gap-2 md:text-xs">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--color-border)] px-2 py-0.5 md:px-3 md:py-1"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-auto grid grid-cols-3 gap-2 md:gap-3">
        {project.impact.map((impact) => (
          <motion.div
            key={impact.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4 }}
            className="rounded-xl border border-[var(--color-border)] bg-[var(--surface-raised)]/70 p-2 text-center text-white md:rounded-2xl md:p-3"
          >
            <p className="text-[10px] uppercase tracking-[0.1em] text-[var(--color-muted)] md:text-xs md:tracking-[0.2em]">
              {impact.label}
            </p>
            <p className="mt-0.5 text-sm font-semibold md:mt-1 md:text-lg">
              <Counter value={impact.value} />
            </p>
          </motion.div>
        ))}
      </div>
    </motion.article>
  );
}

export function SignatureProjects() {
  return (
    <section id="projects" className="space-y-6 py-8 md:space-y-8 md:py-12">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)] md:text-sm md:tracking-[0.3em]">
            Signature projects
          </p>
          <h2 className="mt-2 font-display text-2xl text-white md:mt-3 md:text-3xl">
            Developer craft + business outcomes
          </h2>
        </div>
        <p className="mt-2 max-w-2xl text-xs text-[var(--color-muted)] md:mt-0 md:text-sm">
          Product case studies across consumer VPN, device orchestration, and
          commerce analytics. Every project shipped with instrumentation,
          experiments, and measurable gains.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
        {signatureProjects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </section>
  );
}
