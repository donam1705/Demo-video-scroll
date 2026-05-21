"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import ActionBar from "../ActionBar/ActionBar";
import styles from "./VideoCard.module.css";
import { VideoData } from "@/data/videos";

interface VideoCardProps {
  video: VideoData;
  isActive: boolean;
}

export default function VideoCard({ video, isActive }: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showPlayIcon, setShowPlayIcon] = useState(false);
  const [showPauseIcon, setShowPauseIcon] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const playIconTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (isActive) {
      const playPromise = videoEl.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay blocked — user needs to interact
            setIsPlaying(false);
          });
      }
    } else {
      videoEl.pause();
      setIsPlaying(false);
    }
  }, [isActive]);

  // Update progress bar
  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    const handleTimeUpdate = () => {
      if (videoEl.duration) {
        setProgress((videoEl.currentTime / videoEl.duration) * 100);
      }
    };

    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    return () => videoEl.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const handleVideoClick = useCallback(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    if (playIconTimeout.current) {
      clearTimeout(playIconTimeout.current);
    }

    if (videoEl.paused) {
      videoEl.play();
      setIsPlaying(true);
      setShowPlayIcon(true);
      setShowPauseIcon(false);
    } else {
      videoEl.pause();
      setIsPlaying(false);
      setShowPauseIcon(true);
      setShowPlayIcon(false);
    }

    playIconTimeout.current = setTimeout(() => {
      setShowPlayIcon(false);
      setShowPauseIcon(false);
    }, 600);
  }, []);

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  return (
    <div className={styles.videoCard} id={`video-card-${video.id}`}>
      <div className={styles.videoContainer}>
        {/* Video Element */}
        <video
          ref={videoRef}
          className={styles.video}
          src={video.videoUrl}
          loop
          muted
          playsInline
          preload="metadata"
          onClick={handleVideoClick}
          onLoadedData={handleLoadedData}
          id={`video-player-${video.id}`}
        />

        {/* Loading Spinner */}
        {isLoading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.spinner} />
          </div>
        )}

        {/* Play Icon Overlay */}
        {showPlayIcon && (
          <div className={styles.playPauseOverlay}>
            <div className={styles.playIcon}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Pause Icon Overlay */}
        {showPauseIcon && (
          <div className={styles.playPauseOverlay}>
            <div className={styles.pauseIcon}>
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            </div>
          </div>
        )}

        {/* Gradient Overlays */}
        <div className={styles.topGradient} />
        <div className={styles.gradientOverlay} />

        {/* Video Info */}
        <div className={styles.videoInfo}>
          <div className={styles.authorName}>
            {video.authorName}
          </div>
          <div className={styles.authorHandle}>{video.authorHandle}</div>
          <p className={styles.description}>{video.description}</p>
          <div className={styles.musicInfo}>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            <span className={styles.musicText}>{video.musicName}</span>
          </div>
        </div>

        {/* Action Bar */}
        <ActionBar
          authorName={video.authorName}
          likesCount={video.likesCount}
          commentsCount={video.commentsCount}
          sharesCount={video.sharesCount}
          isPlaying={isPlaying}
        />

        {/* Progress Bar */}
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
