import { MostPopularResponse, SearchResponse, ShowDetailsResponse } from '../types';

const API_BASE_URL = 'https://www.episodate.com/api';

export const tvShowsAPI = {
  // Obtener shows más populares
  getMostPopular: async (page: number = 1): Promise<MostPopularResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/most-popular?page=${page}`);
      if (!response.ok) throw new Error('Error al cargar los shows');
      const data: MostPopularResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Buscar shows
  searchShows: async (query: string): Promise<SearchResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Error al buscar');
      const data: SearchResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  },

  // Obtener detalles de un show
  getShowDetails: async (id: number): Promise<ShowDetailsResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/show-details?q=${id}`);
      if (!response.ok) throw new Error('Error al cargar detalles');
      const data: ShowDetailsResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }
};