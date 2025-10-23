import React from 'react';
import { TVShow } from '../types';
import './ShowCard.css';

interface ShowCardProps {
  show: TVShow;
  onClick: (id: number) => void;
}

const ShowCard: React.FC<ShowCardProps> = ({ show, onClick }) => {
  return (
    <div className="show-card" onClick={() => onClick(show.id)}>
      <img 
        src={show.image_thumbnail_path} 
        alt={show.name}
        className="show-card__image"
      />
      <div className="show-card__content">
        <h3 className="show-card__title">{show.name}</h3>
        <p className="show-card__network">{show.network}</p>
      </div>
    </div>
  );
};

export default ShowCard;