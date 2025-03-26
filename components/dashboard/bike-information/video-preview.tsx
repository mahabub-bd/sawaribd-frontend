import Link from "next/link";

export default function VideoPreview({
  title,
  videoUrl,
  poster,
  alt,
}: {
  title: string;
  videoUrl: string;
  poster: string; // Placeholder image shown before the video plays
  alt: string; // Alternative text for accessibility
}) {
  return (
    <div>
      <h5 className="py-4 text-base  text-gray-800 text-center">{title}</h5>
      <div className="border border-slate-100 p-2 rounded-lg">
        <video
          controls
          poster={poster}
          className="rounded-md w-full h-auto"
          preload="metadata"
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
  );
}
