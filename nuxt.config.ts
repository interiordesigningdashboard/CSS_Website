// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["@nuxt/icon"],
  css: [
    "@fortawesome/fontawesome-free/css/all.css",
    "@/assets/main.css",
    "bootstrap-icons/font/bootstrap-icons.css",
  ],
  ssr: true, // Keep SSR enabled
  app: {
    // For project pages (most common): replace with your repo name
    // e.g. '/my-portfolio/' — include leading & trailing slashes
    baseURL: "/CSS_Website/",
    head: {
      link: [
        { rel: "icon", type: "image/x-icon", href: "/CSS_Website/favicon.ico" },
      ],
    },
  },
  nitro: {
    prerender: {
      // Crawl links found in your pages so they’re generated as HTML
      crawlLinks: true,
      // Make sure the homepage is generated
      routes: ["/"],
    },
  },
  runtimeConfig: {
    public: {
      // STRAPI_URL: "http://192.168.29.237:1337",
      STRAPI_URL: process.env.NUXT_PUBLIC_STRAPI_URL || "http://localhost:1337",
    },
  },
});
