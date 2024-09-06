import React, { useEffect, useState } from 'react';
import CatCard from '../components/CatCard';
// import { mockCats } from './mockData';
import '../App.css';

interface Cat {
  id: string;
  url: string;
}

const AllCats: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [likedCats, setLikedCats] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://api.thecatapi.com/v1/images/search?limit=20')
      .then((res) => res.json())
      .then((data) => setCats(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLike = (cat_id: string) => {
    fetch('/api/cats/likes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cat_id }),
    }).then(() => {
      setLikedCats((prev) => [...prev, cat_id]);
    });
  };

  // useEffect(() => {
  //   setCats(mockCats);
  // }, []);

  // const handleLike = (cat_id: string) => {
  //   fetch('/api/cats/likes', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ cat_id }),
  //   }).then(() => {
  //     setLikedCats((prev) => [...prev, cat_id]);
  //   });
  // };

  return (
    <div className="grid-container">
      {cats.map((cat) => (
        <CatCard
          key={cat.id}
          id={cat.id}
          url={cat.url}
          isLiked={likedCats.includes(cat.id)}
          onLike={handleLike}
        />
      ))}
    </div>
  );
};

export default AllCats;
