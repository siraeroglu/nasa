// test ortamı için ortak ayarlar, jest-dom kullanımı ve test sonrası DOM temizliği

import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// her testten sonra sanal DOMu temizleyerek testlerin birbirini etkilemesini engeller
afterEach(() => {
  cleanup();
});
