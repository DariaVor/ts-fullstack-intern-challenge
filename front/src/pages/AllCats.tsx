import React, { useEffect, useState } from "react";
import { HeartIcon as HeartOutline } from "@heroicons/react/outline"; 
import { HeartIcon as HeartFilled } from "@heroicons/react/solid"; 

const AllCats: React.FC = () => {
  const [cats, setCats] = useState<any[]>([]);
  const [likedCats, setLikedCats] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=20")
      .then((res) => res.json())
      .then((data) => setCats(data))
      .catch((err) => console.error(err));
  }, []);

  const handleLike = (cat_id: string) => {
    fetch("/api/cats/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cat_id }),
    }).then(() => {
      setLikedCats([...likedCats, cat_id]);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cats.map((cat) => (
        <div key={cat.id} className="relative p-4 border rounded-lg shadow-md">
          <img src={cat.url} alt="Cat" className="w-full h-auto rounded-lg" />
          <button
            className="absolute top-2 right-2"
            onClick={() => handleLike(cat.id)}
          >
            {likedCats.includes(cat.id) ? (
              <HeartFilled className="h-8 w-8 text-red-500" />
            ) : (
              <HeartOutline className="h-8 w-8 text-red-500" />
            )}
          </button>
        </div>
      ))}
    </div>
  );
};

export default AllCats;
