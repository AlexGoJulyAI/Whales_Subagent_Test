export interface AudiobookItem {
  id: string;
  coverUrl: string;
  coverAlt: string;
  bookUrl: string;
  title: string;
  subtitle?: string;
  authorName: string;
  authorUrl: string;
  narratorNames: string[];
  narratorUrls: string[];
  length: string;
  releaseDate: string;
  language: string;
  rating: number;
  reviewCount: number;
  description: string;
  price: string;
  buyUrl: string;
}

export interface CategoryChip {
  label: string;
  href: string;
}
