"use client"

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="relative w-64 h-4 bg-muted overflow-hidden rounded-full">
        <div className="absolute top-0 left-0 h-full w-1/2 bg-primary rounded-full animate-pulse"></div>
        <div className="absolute top-0 left-0 h-full w-full animate-shimmer">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full bg-primary animate-bounce"
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: "0.8s",
            }}
          ></div>
        ))}
      </div>

      <p className="mt-6 text-sm font-medium text-muted-foreground">Loading your experience</p>
    </div>
  )
}




