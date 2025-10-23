import React, { useState, useEffect } from 'react';
import { tvShowsAPI } from '../services/api';
import { TVShowDetail } from '../types';
import './DetailPage.css';

interface DetailPageProps {
  showId: number;
  onBack: () => void;
}

const DetailPage: React.FC<DetailPageProps> = ({ showId, onBack }) => {
  const [show, setShow] = useState<TVShowDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadShowDetails();
  }, [showId]);

  const loadShowDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await tvShowsAPI.getShowDetails(showId);
      setShow(data.tvShow);
    } catch (err) {
      setError('Error al cargar los detalles. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Cargando detalles...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error">{error}</div>
        <button onClick={onBack} className="back-button">
          Volver
        </button>
      </div>
    );
  }

  if (!show) {
    return null;
  }

  return (
    <div className="detail-page">
      <button onClick={onBack} className="back-button">
        ← Volver
      </button>

      <div className="detail-page__content">
        <div className="detail-page__image-container">
          <img 
            src={show.image_path} 
            alt={show.name}
            className="detail-page__image"
          />
        </div>

        <div className="detail-page__info">
          <h1 className="detail-page__title">{show.name}</h1>
          
          <div className="detail-page__meta">
            <span className="detail-page__network">{show.network}</span>
            <span className="detail-page__status">{show.status}</span>
            <span className="detail-page__country">{show.country}</span>
          </div>

          {show.genres && show.genres.length > 0 && (
            <div className="detail-page__genres">
              {show.genres.map((genre, index) => (
                <span key={index} className="genre-tag">{genre}</span>
              ))}
            </div>
          )}

          <div className="detail-page__description">
            <h2>Descripción</h2>
            <p dangerouslySetInnerHTML={{ __html: show.description }} />
          </div>

          {show.episodes && show.episodes.length > 0 && (
            <div className="detail-page__episodes">
              <h2>Últimos Episodios</h2>
              <div className="episodes-list">
                {show.episodes.slice(0, 5).map((episode, index) => (
                  <div key={index} className="episode-item">
                    <span className="episode-number">
                      S{episode.season}E{episode.episode}
                    </span>
                    <span className="episode-name">{episode.name}</span>
                    <span className="episode-date">{episode.air_date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;