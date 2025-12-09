// proje için vite ayarları react plugini ve vitestin çalışma ortamı burada tanımlanır

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()], // react için gerekli vite plugini
  test: {
    environment: "jsdom",          // bileşenlerin tarayıcı benzeri ortamda test edilebilmesi için
    setupFiles: "./src/setupTests.js", // jest-dom ve cleanup gibi global test ayarları
  },
});
