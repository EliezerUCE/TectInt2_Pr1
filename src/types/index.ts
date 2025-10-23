// Tipo para un TV Show en la lista
export interface TVShow {
  id: number;
  name: string;
  permalink: string;
  start_date: string;
  end_date: string | null;
  country: string;
  network: string;
  status: string;
  image_thumbnail_path: string;
}

// Tipo para un episodio
export interface Episode {
  season: number;
  episode: number;
  name: string;
  air_date: string;
}

// Tipo para los detalles completos de un show
export interface TVShowDetail {
  id: number;
  name: string;
  permalink: string;
  url: string;
  description: string;
  description_source: string;
  start_date: string;
  end_date: string | null;
  country: string;
  status: string;
  runtime: number;
  network: string;
  youtube_link: string | null;
  image_path: string;
  image_thumbnail_path: string;
  rating: string;
  rating_count: string;
  countdown: any;
  genres: string[];
  pictures: string[];
  episodes: Episode[];
}

// Tipo para la respuesta de la API de shows populares
export interface MostPopularResponse {
  total: string;
  page: number;
  pages: number;
  tv_shows: TVShow[];
}

// Tipo para la respuesta de búsqueda
export interface SearchResponse {
  total: string;
  page: number;
  pages: number;
  tv_shows: TVShow[];
}

// Tipo para la respuesta de detalles
export interface ShowDetailsResponse {
  tvShow: TVShowDetail;
}