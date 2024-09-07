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
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCats = async () => {
      setLoading(true);
      try {
        const url = isLikedPage
          ? `/api/cats/likes?page=${page}`
          : `https://api.thecatapi.com/v1/images/search?limit=20&api_key=live_zpwZZX1KcPVHikhEFkxYV4lOKi2NTPqkI3YKkMBOy1zXZnPIxvuMVLO4q0WwgzP1&page=${page}`;
        const response = await fetch(url);
        const data = await response.json();

        if (isLikedPage) {
          setLikedCats(data);
          setLikedCatIds(data.map((cat: LikedCat) => cat.cat_id));
        } else {
          const filteredCats = data.filter(
            (cat: Cat) => cat.url.endsWith(".jpg") || cat.url.endsWith(".png")
          );
          setCats((prev) => [...prev, ...filteredCats.slice(0, 15)]);
          setHasMore(filteredCats.length > 15);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [isLikedPage, page]);

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
    <div className="app-container">
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
      <div className="pagination-container">
        {loading && !isLikedPage && (
          <div className="loader">... загружаем котиков ...</div>
        )}
        {!loading && hasMore && !isLikedPage && (
          <button
            className="load-more"
            onClick={() => {
              setPage((prevPage) => prevPage + 1);
              setLoading(true);
            }}
          >
            Загрузить еще котиков
          </button>
        )}
      </div>
    </div>
  );
};

export default CatContainer;
