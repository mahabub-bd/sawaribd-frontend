import Image from "next/image";

const ImagePreview = ({
  title,
  src,
  alt,
}: {
  title: string;
  src: string;
  alt: string;
}) =>
  src && (
    <div>
      <h5 className="py-4 text-base font-semibold text-gray-800 text-center">
        {title}
      </h5>
      <div className="border border-slate-100 p-2 rounded-lg">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={300}
          className="rounded-md w-full h-full"
        />
      </div>
    </div>
  );

export default ImagePreview;
