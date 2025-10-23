
import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import './App.css';

const App: React.FC = () => {
  const [selectedShowId, setSelectedShowId] = useState<number | null>(null);

  const handleShowSelect = (showId: number): void => {
    setSelectedShowId(showId);
  };

  const handleBack = (): void => {
    setSelectedShowId(null);
  };

  return (
    <div className="app">
      {selectedShowId ? (
        <DetailPage showId={selectedShowId} onBack={handleBack} />
      ) : (
        <HomePage onShowSelect={handleShowSelect} />
      )}
    </div>
  );
};

export default App;