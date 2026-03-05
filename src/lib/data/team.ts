export interface TeamMember {
  id: string;
  name: string;
  role: string;
  years?: number;
  specialty: string;
  pole: "direction" | "technique" | "coaching";
  image?: string;
}

export const teamMembers: TeamMember[] = [
  // --- Direction ---
  {
    id: "1",
    name: "Sébastien Foti",
    role: "Fondateur & Motoriste",
    years: 46,
    specialty: "Préparation moteur · Banc d'essai · Réglages haute performance",
    pole: "direction",
    image: "/Photos%20/Mecano%20/Bastien%20foti%20.jpeg",
  },
  {
    id: "2",
    name: "Alexis Garcia",
    role: "Team Manager",
    years: 15,
    specialty: "Gestion structure · Stratégie sportive · Relation pilotes",
    pole: "direction",
    image: "/Photos%20/Mecano%20/Alexis%20le%20boss.jpeg",
  },
  // --- Pôle Technique ---
  {
    id: "3",
    name: "Alfred",
    role: "Ingénieur Piste Senior",
    years: 20,
    specialty: "Réglages châssis · Mécanique compétition",
    pole: "technique",
    image: "/Photos%20/Mecano%20/Alfred.jpg",
  },
  {
    id: "4",
    name: "Christian",
    role: "Mécanicien Compétition",
    years: 12,
    specialty: "Préparation moteur · Assemblage châssis",
    pole: "technique",
    image: undefined,
  },
  {
    id: "5",
    name: "Tom",
    role: "Technicien Piste",
    years: 6,
    specialty: "Télémétrie · Analyse données · Chronométrie",
    pole: "technique",
    image: "/Photos%20/Mecano%20/Tom.jpg",
  },
  {
    id: "6",
    name: "Fred",
    role: "Ingénieur Piste & Coach",
    years: 10,
    specialty: "Réglages avancés · Coaching technique pilote",
    pole: "technique",
    image: "/Photos%20/Mecano%20/Fred.jpg",
  },
  // --- Pôle Coaching ---
  {
    id: "7",
    name: "Enzo",
    role: "Coach Performance",
    years: 8,
    specialty: "Pilotage compétition · Trajectoires · Formation jeunes",
    pole: "coaching",
    image: undefined,
  },
  {
    id: "8",
    name: "Mallo",
    role: "Coach Mental & Physique",
    years: 5,
    specialty: "Préparation mentale · Gestion du stress · Condition physique",
    pole: "coaching",
    image: undefined,
  },
];

export const wallOfFame = [
  { name: "John Carlo Fisichella", years: "2000s", category: "KZ" },
  { name: "Alexandra Arrue", years: "2010s", category: "OK-Junior" },
  { name: "Vincent Fraisse", years: "2010s", category: "KZ2" },
  { name: "Laurent Gruppi", years: "2010s", category: "Nationale" },
  { name: "Yann Iglesias", years: "2015s", category: "OK" },
  { name: "Armand Convert", years: "2020s", category: "OK-Junior" },
  { name: "Andy Bonhomme", years: "2020s", category: "KZ2" },
];
