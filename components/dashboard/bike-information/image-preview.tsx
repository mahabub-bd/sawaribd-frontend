"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { getShimmerPlaceholder } from "@/components/ui/shimmer";

interface ImagePreviewProps {
  title: string;
  imageUrl: string;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "video" | "wide" | "portrait";
  priority?: boolean;
}

export default function ImagePreview({
  title,
  imageUrl,
  alt,
  className,
  aspectRatio = "video", // 4:3 default
  priority = false,
}: ImagePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);

  // Generate shimmer effect placeholder
  const shimmerPlaceholder = getShimmerPlaceholder();

  // Define aspect ratio classes
  const aspectRatioClasses = {
    square: "aspect-square",
    video: "aspect-[4/3]",
    wide: "aspect-[16/9]",
    portrait: "aspect-[3/4]",
  };

  return (
    <div className={cn("group flex flex-col", className)}>
      <h3 className="py-3 text-base font-medium text-foreground line-clamp-1 text-center">
        {title}
      </h3>
      <div className="overflow-hidden rounded-lg border bg-background transition-colors">
        <Link
          href={imageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "relative block overflow-hidden",
            aspectRatioClasses[aspectRatio]
          )}
        >
          <div
            className={cn(
              "absolute inset-0 bg-background/40 backdrop-blur-sm flex items-center justify-center opacity-0 transition-opacity duration-300 z-10",
              "group-hover:opacity-100"
            )}
          >
            <span className="rounded-full bg-background/90 px-3 py-1 text-xs font-medium">
              View Full Image
            </span>
          </div>

          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-all duration-300",
              isLoading ? "scale-110 blur-sm" : "scale-100 blur-0",
              "group-hover:scale-105"
            )}
            placeholder="blur"
            blurDataURL={shimmerPlaceholder}
            priority={priority}
            onLoadingComplete={() => setIsLoading(false)}
          />
        </Link>
      </div>
    </div>
  );
}
