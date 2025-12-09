// vite ayarları
// burada hem normal build hem de vitest için ayar yapıyorum

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/nasa/", // github pages'de repo adın neyse onu yazıyoruz
  plugins: [react()],
  test: {
    environment: "jsdom", // react component'lerini browser ortamı gibi test etmek için
    setupFiles: "./src/setupTests.js", // jest-dom ayarlarını buradan yüklüyorum
  },
});
