// uygulamanın temel router yapısı
// hangi URLde hangi sayfa açılacak burada belirleniyor

import { Routes, Route } from "react-router-dom";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";

function App() {
  return (
    <Routes>
      {/* ana arama sayfası */}
      <Route path="/" element={<SearchPage />} />

      {/* seçilen içerik için detay sayfası */}
      <Route path="/asset/:nasaId" element={<DetailPage />} />
    </Routes>
  );
}

export default App;
