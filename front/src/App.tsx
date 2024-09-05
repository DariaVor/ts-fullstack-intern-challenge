import React, { useState } from 'react';
import AllCats from './pages/AllCats';
import LikedCats from './pages/LikedCats';
import './App.css'; // Import the CSS file

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'all' | 'liked'>('all');

  return (
    <div className="app-container">
      <nav className="navbar">
        <button
          className={`nav-button ${currentTab === 'all' ? 'active' : ''}`}
          onClick={() => setCurrentTab('all')}
        >
          Все котики
        </button>
        <button
          className={`nav-button ${currentTab === 'liked' ? 'active' : ''}`}
          onClick={() => setCurrentTab('liked')}
        >
          Любимые котики
        </button>
      </nav>

      <main className="main-content">
        {currentTab === 'all' ? <AllCats /> : <LikedCats />}
      </main>
    </div>
  );
};

export default App;
