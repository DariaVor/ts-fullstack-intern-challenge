import React, { useState } from 'react';
import AllCats from './pages/AllCats';
import LikedCats from './pages/LikedCats';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'all' | 'liked'>('all');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="p-4 bg-blue-500 flex justify-center space-x-4">
        <button
          className={`px-4 py-2 ${currentTab === 'all' ? 'bg-white text-blue-500' : 'text-white'}`}
          onClick={() => setCurrentTab('all')}
        >
          Все котики
        </button>
        <button
          className={`px-4 py-2 ${currentTab === 'liked' ? 'bg-white text-blue-500' : 'text-white'}`}
          onClick={() => setCurrentTab('liked')}
        >
          Любимые котики
        </button>
      </nav>

      <main className="p-4">
        {currentTab === 'all' ? <AllCats /> : <LikedCats />}
      </main>
    </div>
  );
};

export default App;
