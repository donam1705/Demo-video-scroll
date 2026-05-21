"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import VideoCard from "../VideoCard/VideoCard";
import { videos } from "@/data/videos";
import styles from "./VideoFeed.module.css";

export default function VideoFeed() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Intersection Observer to detect which video is in viewport
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index)) {
            setActiveIndex(index);
          }
        }
      });
    },
    []
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(observerCallback, {
      root: container,
      threshold: 0.7, // 70% visible = active
    });

    const cards = container.querySelectorAll("[data-index]");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [observerCallback]);

  return (
    <div
      className={styles.feedContainer}
      ref={containerRef}
      id="video-feed-container"
    >
      {videos.map((video, index) => (
        <div key={video.id} data-index={index}>
          <VideoCard video={video} isActive={index === activeIndex} />
        </div>
      ))}
    </div>
  );
}
