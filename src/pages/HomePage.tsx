import React, { useState, useEffect } from 'react';
import { tvShowsAPI } from '../services/api';
import { TVShow } from '../types';
import ShowCard from '../components/ShowCard';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

interface HomePageProps {
  onShowSelect: (showId: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onShowSelect }) => {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    loadPopularShows(1);
  }, []);

  const loadPopularShows = async (page: number) => {
    try {
      setLoading(true);
      setError(null);
      const data = await tvShowsAPI.getMostPopular(page);
      setShows(data.tv_shows);
      setCurrentPage(page);
      setIsSearching(false);
    } catch (err) {
      setError('Error al cargar las series. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query: string) => {
    try {
      setLoading(true);
      setError(null);
      const data = await tvShowsAPI.searchShows(query);
      setShows(data.tv_shows || []);
      setIsSearching(true);
    } catch (err) {
      setError('Error al buscar. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearSearch = () => {
    loadPopularShows(1);
  };

  if (loading) {
    return <div className="loading">Cargando series...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="home-page">
      <header className="home-page__header">
        <h1>Series de TV Populares</h1>
        <SearchBar onSearch={handleSearch} onClear={handleClearSearch} />
      </header>

      <div className="home-page__grid">
        {shows.length === 0 ? (
          <p className="no-results">No se encontraron resultados</p>
        ) : (
          shows.map((show) => (
            <ShowCard 
              key={show.id} 
              show={show} 
              onClick={onShowSelect}
            />
          ))
        )}
      </div>

      {!isSearching && (
        <div className="pagination">
          <button
            className="pagination__button"
            onClick={() => loadPopularShows(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span className="pagination__current">Página {currentPage}</span>
          <button
            className="pagination__button"
            onClick={() => loadPopularShows(currentPage + 1)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;