"use client";

import { useState } from "react";
import styles from "./ActionBar.module.css";

interface ActionBarProps {
  authorName: string;
  likesCount: number;
  commentsCount: number;
  bookmarksCount: number;
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
  bookmarksCount,
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
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
        <span className={styles.actionCount}>{formatCount(currentLikes)}</span>
      </div>

      {/* Comment */}
      <div className={styles.actionItem}>
        <button className={styles.actionButton} id="action-comment" aria-label="Comment">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 5.92 2 10.75c0 2.76 1.55 5.2 4.02 6.78L5.5 22l4.98-2.58c.49.07 1 .11 1.52.11 5.52 0 10-3.92 10-8.75S17.52 2 12 2zM8 11.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm4 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
          </svg>
        </button>
        <span className={styles.actionCount}>{formatCount(commentsCount)}</span>
      </div>

      {/* Bookmark */}
      <div className={styles.actionItem}>
        <button className={styles.actionButton} id="action-bookmark" aria-label="Bookmark">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z" />
          </svg>
        </button>
        <span className={styles.actionCount}>{formatCount(bookmarksCount)}</span>
      </div>

      {/* Share */}
      <div className={styles.actionItem}>
        <button className={styles.actionButton} id="action-share" aria-label="Share">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 12l-8-8v5c-5 0-8.5 3.5-9 9 2.5-3 5.5-4.5 9-4.5v4.5l8-6z" />
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
