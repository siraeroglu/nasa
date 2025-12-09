// ana arama sayfası: arama formu, filtreleme, sonuç listesi ve sayfa geçişlerini yönetir

import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MediaCard from "../components/MediaCard";
import { searchNasaImages } from "../services/nasaApi";
import nasaLogo from "../assets/nasa-logo.png"; // uzantını ne koyduysan ona göre düzelt


function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  // url üzerinden gelen değerler (sayfa yenilense bile arama kaybolmaz)
  const initialQuery = searchParams.get("q") || "";
  const initialPageParam = parseInt(searchParams.get("page") || "1", 10);
  const initialPage = Number.isNaN(initialPageParam) ? 1 : initialPageParam;
  const initialMedia = searchParams.get("media") || "all";

  const [query, setQuery] = useState(initialQuery);
  const [mediaType, setMediaType] = useState(initialMedia);
  const [results, setResults] = useState([]);     // nasa sonuçları
  const [loading, setLoading] = useState(false);   // yükleniyor durumu
  const [error, setError] = useState("");          // kullanıcıya gösterilecek hata

  // arama formu gönderildiğinde URL parametrelerini günceller
  const handleSearch = (e) => {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) {
      setError("please type something to search.");
      setResults([]);
      setSearchParams({});
      return;
    }

    setError("");

    // yeni arama → sayfa 1
    setSearchParams({
      q: trimmed,
      page: "1",
      media: mediaType,
    });
  };

  // URL değiştiğinde aramayı tetikler
  useEffect(() => {
    const q = searchParams.get("q") || "";
    const pageParam = parseInt(searchParams.get("page") || "1", 10);
    const currentPage = Number.isNaN(pageParam) ? 1 : pageParam;
    const mediaFromUrl = searchParams.get("media") || "all";

    if (!q.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }

    // input ve dropdownı URL ile senkron tut
    setQuery(q);
    setMediaType(mediaFromUrl);

    const runSearch = async () => {
      setLoading(true);
      setError("");
      setResults([]);

      try {
        const items = await searchNasaImages(q, currentPage, mediaFromUrl);

        // yeni tarihli olanları önce göster
        const sorted = items.slice().sort((a, b) => {
          const dateA = new Date(a.data?.[0]?.date_created || 0).getTime();
          const dateB = new Date(b.data?.[0]?.date_created || 0).getTime();
          return dateB - dateA;
        });

        setResults(sorted);
      } catch (err) {
        setError("something went wrong while talking to nasa api.");
      } finally {
        setLoading(false);
      }
    };

    runSearch();
  }, [searchParams]);

  // url’de q varsa true
  const hasQueryInUrl = (searchParams.get("q") || "").trim();
  const currentPageParam = parseInt(searchParams.get("page") || "1", 10);
  const currentPage = Number.isNaN(currentPageParam) ? 1 : currentPageParam;

  // pagination için yardımcı fonksiyon
  const changePage = (nextPage) => {
    const trimmed = (searchParams.get("q") || "").trim();
    if (!trimmed) return;

    const mediaFromUrl = searchParams.get("media") || "all";
    const safePage = nextPage < 1 ? 1 : nextPage;

    setSearchParams({
      q: trimmed,
      page: String(safePage),
      media: mediaFromUrl,
    });
  };

  return (
    <main className="page">
      <div className="page-inner">
        <header className="page-header">
          <h1 className="page-title">NASA Image and Video Explorer</h1>
          <p className="page-subtitle">
            Search images and videos from the NASA media library.
          </p>
        </header>

        <section className="search-section">
  {/* sadece arama alanını daraltmak için ayrı bir sarmalayıcı */}
  <div className="search-bar-wrapper">
    <SearchBar
      query={query}
      mediaType={mediaType}
      onChange={setQuery}
      onMediaChange={setMediaType}
      onSubmit={handleSearch}
    />
  </div>

          {/* arama yapılmamışsa gösterilen karşılama bölümü */}
         {!hasQueryInUrl && !loading && !error && (
  <>
    <section className="hero">
      <h2 className="hero-title">🚀 Ready to explore space?</h2>
      <p className="hero-text">
        Try searching for things like <strong>moon</strong>,{" "}
        <strong>sun</strong>, <strong>galaxies</strong>,{" "}
        <strong>stars</strong> or anything you&apos;re curious about
        to explore NASA&apos;s image and video archive.
      </p>
    </section>

    {/* hero'nun hemen altında ortalanmış NASA logosu */}
    <div className="nasa-logo-wrapper">
      <img src={nasaLogo} alt="NASA logo" className="nasa-logo" />
    </div>
  </>
)}

          {loading && (
            <div className="loading">
              <div className="spinner" />
              <p className="loading-text">loading NASA data...</p>
            </div>
          )}

          {error && !loading && (
            <p className="status-text error">{error}</p>
          )}

          {/* sonuç listesi */}
          {!loading && !error && results.length > 0 && (
            <>
              <ul className="results-list">
                {results.map((item) => (
                  <MediaCard key={item.data?.[0]?.nasa_id} item={item} />
                ))}
              </ul>

              {/* sayfa geçişleri */}
              <div className="pagination">
                <button
                  type="button"
                  className="pagination-button"
                  onClick={() => changePage(currentPage - 1)}
                  disabled={currentPage <= 1}
                >
                  previous
                </button>

                <span className="pagination-current">
                  page {currentPage}
                </span>

                <button
                  type="button"
                  className="pagination-button"
                  onClick={() => changePage(currentPage + 1)}
                >
                  next
                </button>
              </div>
            </>
          )}

          {/* sonuç bulunamadı mesajı */}
          {!loading &&
            !error &&
            results.length === 0 &&
            hasQueryInUrl && (
              <section className="empty-state">
                <div className="empty-icon">🔍</div>
                <h2 className="empty-title">No results found</h2>
                <p className="empty-text">Try a different keyword.</p>
              </section>
            )}
        </section>
      </div>

    </main>
  );
}

export default SearchPage;
