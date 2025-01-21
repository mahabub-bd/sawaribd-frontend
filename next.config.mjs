const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "sawaribd.s3.amazonaws.com",
          port: "",
          pathname: "/**",
        },
        {
          protocol: "https",
          hostname: "api.sawaribd.com",
          port: "",
          pathname: "/**",
        },
      ],
    },
    experimental: {
      serverActions: {
        bodySizeLimit: "5mb",
      },
    },
  };
  
  export default nextConfig;