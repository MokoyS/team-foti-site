export type ArticleType = "News" | "Transfert" | "Résultat";

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  type: ArticleType;
  image_cover?: string;
  date: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "Domination à Lonato : la Team Foti impose son rythme",
    slug: "victoire-euro-series",
    content: "La Team Foti remporte la manche italienne du Championnat d'Europe. Double podium en OK et OK-Junior. Chronos au cordeau et stratégie piste sans faute.",
    type: "Résultat",
    date: "2024-09-15",
  },
  {
    id: "2",
    title: "OK-Junior : Lucas M. rejoint la structure Foti pour 2025",
    slug: "nouveau-pilote-okj",
    content: "Lucas M. rejoint la Team Foti pour la saison 2025. Le jeune pilote français intègre notre structure compétition et bénéficiera des réglages et du suivi performance.",
    type: "Transfert",
    date: "2024-10-01",
  },
  {
    id: "3",
    title: "Pré-saison 2025 : essais Lonato, inscriptions ouvertes",
    slug: "pre-saison-2025",
    content: "Les essais de pré-saison se dérouleront sur le circuit de Lonato. Inscriptions ouvertes pour les pilotes partenaires. Châssis et moteurs prêts à la limite.",
    type: "News",
    date: "2024-11-10",
  },
];

export const palmares = [
  { year: "2024", title: "Champion d'Europe OK-Junior", event: "Wackersdorf" },
  { year: "2023", title: "Vice-champion du monde OK", event: "Sarno" },
  { year: "2022", title: "Champion d'Europe OK", event: "Kristianstad" },
  { year: "2021", title: "Champion de France OK-Junior", event: "Essay" },
  { year: "2019", title: "Champion d'Europe KZ2", event: "Lonato" },
];
