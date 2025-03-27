"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

interface VideoPreviewProps {
  title: string;
  videoUrl: string;
  poster: string;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "video" | "wide" | "portrait";
}

export default function VideoPreview({
  title,
  videoUrl,
  poster,
  alt,
  className,
  aspectRatio = "video", // 4:3 default to match ImagePreview
}: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Define aspect ratio classes - same as ImagePreview
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-[4/3]",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
  };

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  return (
    <div className={cn("group flex flex-col", className)}>
      <h3 className="py-3 text-base font-medium text-foreground line-clamp-1 text-center">
        {title}
      </h3>
      <div className="overflow-hidden rounded-lg border bg-background transition-colors">
        <div
          className={cn(
            "relative block overflow-hidden",
            aspectRatioClasses[aspectRatio]
          )}
        >
          {!isPlaying && (
            <div
              className={cn(
                "absolute inset-0 flex items-center justify-center z-10 cursor-pointer"
              )}
              onClick={handlePlayClick}
            >
              <div className="rounded-full bg-primary/90 p-3 text-primary-foreground transition-transform duration-300 hover:scale-110">
                <Play className="h-6 w-6 fill-current" />
              </div>
            </div>
          )}

          <video
            ref={videoRef}
            className={cn("w-full h-full object-cover")}
            poster={poster || "/placeholder.svg"}
            preload="metadata"
            controls={isPlaying}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            <source src={videoUrl} type="video/mp4" />
            <p>
              Your browser does not support HTML video. Please{" "}
              <Link href={videoUrl} target="_blank" rel="noopener noreferrer">
                download the video
              </Link>{" "}
              to view it.
            </p>
          </video>
        </div>
      </div>
    </div>
  );
}
