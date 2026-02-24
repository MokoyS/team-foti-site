"use client";

import { motion } from "framer-motion";
import { BentoGrid, BentoCell } from "@/components/ui/BentoGrid";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";
import { teamMembers } from "@/lib/data/team";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export function TeamPageContent() {
  return (
    <div className="min-h-screen bg-background bg-carbon-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-24">
        <ScrollReveal>
          <h1 className="font-heading font-extrabold italic text-3xl sm:text-4xl text-accent-yellow tracking-tight mb-2">
            L'équipe
          </h1>
          <p className="font-mono text-xs text-foreground/50 uppercase tracking-widest mb-4">
            The Crew
          </p>
          <p className="text-foreground/80 max-w-2xl text-sm leading-relaxed mb-12">
            Ingénieurs piste, expert performance pilote et logistique. Une équipe tournée vers la précision et la victoire.
          </p>
        </ScrollReveal>

        <BentoGrid className="mb-16">
          <BentoCell colSpan={2}>
            <p className="font-heading text-foreground/90 leading-relaxed">
              Les Foti et leurs collaborateurs mettent leur expérience au service des pilotes et des structures. 
              Technique, télémétrie, réglages et relation client sont au cœur de notre engagement. 
              Nous ne préparons pas que des karts — nous préparons des champions.
            </p>
          </BentoCell>
          <BentoCell>
            <div className="flex flex-col justify-center h-full">
              <p className="font-mono text-xs text-foreground/50 uppercase tracking-wider">
                Loriol-sur-Drôme · Depuis 1984
              </p>
            </div>
          </BentoCell>
        </BentoGrid>

        <ScrollReveal delay={0.1}>
          <h2 className="font-heading font-bold italic text-xl text-accent-yellow tracking-tight mb-8">
            L'équipe technique
          </h2>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <TeamMemberCard key={member.id} member={member} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
