import Image from "next/image";

export default function ImagePreview({
  title,
  imageUrl,
  alt,
}: {
  title: string;
  imageUrl: string;
  alt: string;
}) {
  // Define a placeholder if needed (or fetch dynamically elsewhere)
  const placeholder = "data:image/png;base64,placeholderValue";

  return (
    <div>
      <h5 className="py-4 text-base font-semibold text-gray-800 text-center">
        {title}
      </h5>
      <div className="border border-slate-100 p-2 rounded-lg">
        <Image
          src={imageUrl}
          alt={alt}
          width={400}
          height={300}
          className="rounded-md w-full h-full"
          placeholder="blur"
          blurDataURL={placeholder} // Ensure `placeholder` is defined
        />
      </div>
    </div>
  );
}
