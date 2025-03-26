export function shimmer(w: number, h: number): string {
  return `
      <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <defs>
          <linearGradient id="g">
            <stop stopColor="#f6f7f8" offset="0%" />
            <stop stopColor="#edeef1" offset="20%" />
            <stop stopColor="#f6f7f8" offset="40%" />
            <stop stopColor="#f6f7f8" offset="100%" />
          </linearGradient>
        </defs>
        <rect width="${w}" height="${h}" fill="#f6f7f8" />
        <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
        <animate xlinkHref="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
      </svg>`;
}

export function toBase64(str: string): string {
  return typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);
}

export function getShimmerPlaceholder(width = 700, height = 475): string {
  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`;
}
