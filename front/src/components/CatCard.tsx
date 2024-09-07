import React from "react";
import styles from "./CatCard.module.css";

interface CatCardProps {
  id: string;
  url: string;
  isLiked: boolean;
  onLike: (id: string) => void;
}

const CatCard: React.FC<CatCardProps> = ({ id, url, isLiked, onLike }) => {
  return (
    <div className={styles.card}>
      <img src={url} alt="Котик" className="w-full h-full rounded-lg" />
      <button className={styles.heartButton} onClick={() => onLike(id)}>
        {isLiked ? (
          <img
            src="/favorite.svg"
            alt="Лайкнуто"
            className={styles.heartFilled}
          />
        ) : (
          <img
            src="/favorite_border.svg"
            alt="Не лайкнуто"
            className={styles.heartOutline}
          />
        )}
      </button>
    </div>
  );
};

export default CatCard;
