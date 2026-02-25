"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { TeamMember } from "@/lib/data/team";

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

export function TeamMemberCard({ member, index }: TeamMemberCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: index * 0.06 }}
      className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm overflow-hidden transition-colors duration-200 hover:border-white/[0.14]"
    >
      <div className="relative aspect-[3/4] bg-carbon-600 overflow-hidden">
        {member.image ? (
          <Image
            src={member.image}
            alt=""
            fill
            className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-carbon-600 to-carbon-700 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-500">
            <span className="font-mono text-4xl font-bold text-white/20 group-hover:text-accent-yellow/30 transition-colors">
              {member.name.split(" ").map((n) => n[0]).join("")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-5 border-t border-white/[0.06]">
        <h3 className="font-heading font-bold italic text-accent-yellow tracking-tight">
          {member.name}
        </h3>
        <p className="font-mono text-xs text-foreground/70 mt-1 uppercase tracking-wider">
          {member.role}
        </p>
        <dl className="mt-3 pt-3 border-t border-white/5 space-y-1">
          <div className="flex justify-between text-xs">
            <dt className="text-foreground/50 font-heading">Expérience</dt>
            <dd className="font-mono text-foreground/80">{member.years} ans</dd>
          </div>
          <div className="text-xs">
            <dt className="text-foreground/50 font-heading mb-0.5">Spécialité</dt>
            <dd className="font-mono text-foreground/80">{member.specialty}</dd>
          </div>
        </dl>
      </div>
    </motion.article>
  );
}
