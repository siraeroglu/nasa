// react uygulamasının giriş noktası, App bileşenini DOM içindeki roota bağlıyoruz
// ayrıca tüm uygulamayı BrowserRouter ile sarmalayarak yönlendirme desteğini aktif ediyoruz

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* github pages için basename = import.meta.env.BASE_URL */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
