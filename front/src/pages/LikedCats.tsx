import React, { useEffect, useState } from "react";

const LikedCats: React.FC = () => {
  const [likedCats, setLikedCats] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/cats/likes")
      .then((res) => res.json())
      .then((data) => setLikedCats(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {likedCats.map((cat) => (
        <div key={cat.cat_id} className="p-4 border rounded-lg shadow-md">
          <img
            src={`https://cdn2.thecatapi.com/images/${cat.cat_id}.jpg`}
            alt="Liked Cat"
            className="w-full h-auto rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};

export default LikedCats;
