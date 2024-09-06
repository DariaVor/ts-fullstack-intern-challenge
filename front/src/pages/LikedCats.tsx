import React, { useEffect, useState } from 'react';
import CatCard from '../components/CatCard';
import '../App.css'; 

interface LikedCat {
  cat_id: string;
}

const LikedCats: React.FC = () => {
  const [likedCats, setLikedCats] = useState<LikedCat[]>([]);

  useEffect(() => {
    fetch('/api/cats/likes')
      .then((res) => res.json())
      .then((data) => setLikedCats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid-container">
      {likedCats.map((cat) => (
        <CatCard
          key={cat.cat_id}
          id={cat.cat_id}
          url={`https://cdn2.thecatapi.com/images/${cat.cat_id}.jpg`}
          isLiked={true}
          onLike={() => {}}
        />
      ))}
    </div>
  );
};

export default LikedCats;
