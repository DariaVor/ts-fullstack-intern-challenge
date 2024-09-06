import React from 'react';
import { HeartIcon as HeartOutline } from '@heroicons/react/outline';
import { HeartIcon as HeartFilled } from '@heroicons/react/solid';
import styles from './CatCard.module.css';

interface CatCardProps {
  id: string;
  url: string;
  isLiked: boolean;
  onLike: (id: string) => void;
}

const CatCard: React.FC<CatCardProps> = ({ id, url, isLiked, onLike }) => {
    return (
      <div className={styles.card}>
        <img
          src={url}
          alt="Котик"
          className="w-full h-full rounded-lg"
        />
        <button
          className={styles.heartButton}
          onClick={() => onLike(id)}
        >
          {isLiked ? (
            <HeartFilled className={`h-8 w-8 ${styles.heartFilled} active`} />
          ) : (
            <HeartOutline className={`h-8 w-8 ${styles.heartOutline}`} />
          )}
        </button>
      </div>
    );
  };

export default CatCard;
