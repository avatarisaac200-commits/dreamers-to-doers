/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/covener", destination: "/host", permanent: true },
      { source: "/covener/", destination: "/host", permanent: true },
      { source: "/convener", destination: "/host", permanent: true },
      { source: "/convener/", destination: "/host", permanent: true },
      { source: "/Host", destination: "/host", permanent: true },
      { source: "/Host/", destination: "/host", permanent: true },
      { source: "/Covener", destination: "/host", permanent: true },
      { source: "/Covener/", destination: "/host", permanent: true },
      { source: "/Convener", destination: "/host", permanent: true },
      { source: "/Convener/", destination: "/host", permanent: true },
      { source: "/facilitators.html", destination: "/facilitators", permanent: true },
      { source: "/impact-footprints.html", destination: "/impact-footprints", permanent: true },
      { source: "/covener.html", destination: "/host", permanent: true },
      { source: "/convener.html", destination: "/host", permanent: true },
    ];
  },
};

module.exports = nextConfig;
