export interface TeamMember {
  id: string;
  name: string;
  role: string;
  years: number;
  specialty: string;
  /** URL image optionnelle – si absente, placeholder gradient */
  image?: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Marco Foti",
    role: "Directeur Technique",
    years: 40,
    specialty: "Réglages châssis · Stratégie course",
    image: undefined,
  },
  {
    id: "2",
    name: "Luca Foti",
    role: "Ingénieur Piste",
    years: 18,
    specialty: "Moteurs · Télémétrie · Chronométrie",
    image: undefined,
  },
  {
    id: "3",
    name: "Sophie Bernard",
    role: "Expert Performance Pilote",
    years: 12,
    specialty: "Préparation mentale · Analyse trajectoires",
    image: undefined,
  },
  {
    id: "4",
    name: "Thomas Roux",
    role: "Ingénieur Piste",
    years: 8,
    specialty: "Carbu · Grip · Logistique paddock",
    image: undefined,
  },
];
