export default function manifest() {
  return {
    name: "Animalize",
    short_name: "Animalize",
    description: "Next generation of Laboratory Management System",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/logo/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/logo/icon-256x256.png",
        sizes: "256x256",
        type: "image/png",
      },
      {
        src: "/logo/icon-384x384.png",
        sizes: "384x384",
        type: "image/png",
      },
      {
        src: "/logo/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
