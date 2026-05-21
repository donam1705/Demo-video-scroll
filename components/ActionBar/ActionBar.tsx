"use client";

import { useState } from "react";
import styles from "./ActionBar.module.css";

interface ActionBarProps {
  authorName: string;
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isPlaying: boolean;
}

function formatCount(count: number): string {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + "M";
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1) + "K";
  }
  return count.toString();
}

export default function ActionBar({
  authorName,
  likesCount,
  commentsCount,
  sharesCount,
  isPlaying,
}: ActionBarProps) {
  const [liked, setLiked] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likesCount);

  const handleLike = () => {
    if (liked) {
      setCurrentLikes((prev) => prev - 1);
    } else {
      setCurrentLikes((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={styles.actionBar}>
      {/* Author Avatar */}
      <div className={styles.authorAvatar} id="action-author-avatar">
        {initials}
        <span className={styles.followBadge}>+</span>
      </div>

      {/* Like */}
      <div className={styles.actionItem}>
        <button
          className={`${styles.likeButton} ${liked ? styles.liked : ""}`}
          onClick={handleLike}
          id="action-like"
          aria-label="Like"
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {liked ? (
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            ) : (
              <path d="M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z" />
            )}
          </svg>
        </button>
        <span className={styles.actionCount}>{formatCount(currentLikes)}</span>
      </div>

      {/* Comment */}
      <div className={styles.actionItem}>
        <button className={styles.actionButton} id="action-comment" aria-label="Comment">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2v10z" />
          </svg>
        </button>
        <span className={styles.actionCount}>{formatCount(commentsCount)}</span>
      </div>

      {/* Share */}
      <div className={styles.actionItem}>
        <button className={styles.actionButton} id="action-share" aria-label="Share">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z" />
          </svg>
        </button>
        <span className={styles.actionCount}>{formatCount(sharesCount)}</span>
      </div>

      {/* Music Disc */}
      <div className={`${styles.musicDisc} ${isPlaying ? styles.spinning : ""}`}>
        <div className={styles.musicDiscInner} />
        <span className={styles.musicDiscLabel}>🎵</span>
      </div>
    </div>
  );
}
