import { defineConfig } from "vite";

// Usa percorsi relativi per caricare gli asset anche quando il sito è pubblicato
// in una sottocartella, ad esempio su GitHub Pages.
export default defineConfig({
  base: "./",
});
