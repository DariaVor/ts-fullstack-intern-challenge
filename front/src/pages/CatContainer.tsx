import React, { useEffect, useState } from "react";
import CatCard from "../components/CatCard";
import "../App.css";

interface Cat {
  id: string;
  url: string;
}

interface LikedCat {
  cat_id: string;
}

const CatContainer: React.FC<{ isLikedPage?: boolean }> = ({ isLikedPage }) => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [likedCats, setLikedCats] = useState<LikedCat[]>([]);
  const [likedCatIds, setLikedCatIds] = useState<string[]>([]);

  useEffect(() => {
    if (isLikedPage) {
      fetch("/api/cats/likes")
        .then((res) => res.json())
        .then((data) => {
          setLikedCats(data);
          setLikedCatIds(data.map((cat: LikedCat) => cat.cat_id));
        })
        .catch((err) => console.error(err));
    } else {
      fetch(
        "https://api.thecatapi.com/v1/images/search?limit=15&api_key=live_zpwZZX1KcPVHikhEFkxYV4lOKi2NTPqkI3YKkMBOy1zXZnPIxvuMVLO4q0WwgzP1"
      )
        .then((res) => res.json())
        .then((data) => {
          const filteredCats = data.filter(
            (cat: Cat) => cat.url.endsWith(".jpg") || cat.url.endsWith(".png")
          );
          setCats(filteredCats);
        })
        .catch((err) => console.error(err));
    }
  }, [isLikedPage]);

  const handleLike = (cat_id: string) => {
    if (likedCatIds.includes(cat_id)) {
      fetch(`/api/cats/likes/${cat_id}`, {
        method: "DELETE",
      }).then(() => {
        if (isLikedPage) {
          setLikedCats((prev) => prev.filter((cat) => cat.cat_id !== cat_id));
        }
        setLikedCatIds((prev) => prev.filter((id) => id !== cat_id));
      });
    } else {
      fetch("/api/cats/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cat_id }),
      }).then(() => {
        if (isLikedPage) {
          setLikedCats((prev) => [...prev, { cat_id }]);
        }
        setLikedCatIds((prev) => [...prev, cat_id]);
      });
    }
  };

  return (
    <div className="grid-container">
      {(isLikedPage ? likedCats : cats).map((cat) => {
        const isLikedCat = "cat_id" in cat;
        return (
          <CatCard
            key={isLikedCat ? (cat as LikedCat).cat_id : (cat as Cat).id}
            id={isLikedCat ? (cat as LikedCat).cat_id : (cat as Cat).id}
            url={
              isLikedCat
                ? `https://cdn2.thecatapi.com/images/${
                    (cat as LikedCat).cat_id
                  }.jpg`
                : (cat as Cat).url
            }
            isLiked={likedCatIds.includes(
              isLikedCat ? (cat as LikedCat).cat_id : (cat as Cat).id
            )}
            onLike={handleLike}
          />
        );
      })}
    </div>
  );
};

export default CatContainer;
