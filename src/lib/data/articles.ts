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
    title: "Analyse technique : comment le Monster K nous a donné le titre KZ2",
    slug: "analyse-technique-monster-k-kz2",
    content: "Derrière chaque titre se cache un châssis pensé au millimètre. Sébastien Foti dévoile les réglages clés du Monster K qui nous ont permis de dominer la saison régionale KZ2 cette année. Géométrie, grip et préparation moteur — tout est dans les détails.",
    type: "Résultat",
    image_cover: "/Photos%20/resultats-podiums/Podium%20Champ%20france.jpg",
    date: "2025-10-20",
  },
  {
    id: "2",
    title: "Andy Bonhomme rejoint la Team Foti pour la saison 2026",
    slug: "andy-bonhomme-team-foti-2026",
    content: "Andy Bonhomme intègre la structure Foti pour la saison 2026 en KZ2. Le pilote rhônalpin bénéficiera du chassis Monster K, de la préparation moteur Foti et du suivi complet de nos ingénieurs piste.",
    type: "Transfert",
    image_cover: "/Photos%20/Pilotes/Alexis%20Salbris%20-%20Copie.jpg",
    date: "2025-11-15",
  },
  {
    id: "3",
    title: "Formation jeunes pilotes : de la base au sommet",
    slug: "formation-jeunes-pilotes",
    content: "Notre pôle coaching — Enzo, Fred et Mallo — lance un programme de formation intensif pour les Mini et OK-Junior. Trajectoires, gestion du stress et condition physique : nous formons les champions de demain comme nous l'avons fait avec Fisichella, Arrue et Convert.",
    type: "News",
    image_cover: "/Photos%20/Mecano%20/Hugo%202%20Ambiance.jpg",
    date: "2025-12-01",
  },
  {
    id: "4",
    title: "Monster K 2026 : les nouveautés dévoilées avec Yuri Serafini",
    slug: "monster-k-2026-nouveautes",
    content: "En partenariat avec Yuri Serafini, le Monster K évolue pour 2026. Nouveau bras de direction, triangle AV optimisé et grip de sortie de virage amélioré. Disponible dès janvier en exclusivité chez Team Foti.",
    type: "News",
    image_cover: "/Photos%20/Line%20Up%20et%20transfert/line%20up%20kz.png",
    date: "2025-12-10",
  },
  {
    id: "5",
    title: "Open Kart Salbris 2026 : la Team Foti en force",
    slug: "open-kart-salbris-2026",
    content: "Retour en images sur l'Open Kart de Salbris, le 22 février 2026. Nos pilotes ont brillé sur ce circuit mythique. Un avant-goût de la saison à venir.",
    type: "Résultat",
    image_cover: "/Photos%20/resultats-podiums/21_OPENKART_Salbris_22022026-_T5A4369.jpg",
    date: "2026-02-22",
  },
];

export const palmares = [
  { year: "2025", title: "Champion Régional KZ2", event: "Ligue Rhône-Alpes" },
  { year: "2024", title: "Champion d'Europe OK-Junior", event: "Wackersdorf" },
  { year: "2023", title: "Vice-champion du monde OK", event: "Sarno" },
  { year: "2022", title: "Champion d'Europe OK", event: "Kristianstad" },
  { year: "2021", title: "Champion de France OK-Junior", event: "Essay" },
  { year: "2019", title: "Champion d'Europe KZ2", event: "Lonato" },
];
