// her bir nasa içeriği için detay görüntüsünü gösteren sayfa

import { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getNasaAssetDetails } from "../services/nasaApi";

function DetailPage() {
  const { nasaId } = useParams(); // URLdeki dinamik id
  const navigate = useNavigate();
  const location = useLocation();

  // listeden gelirken gönderilen meta bilgisi
  const initialMeta = location.state?.meta || null;
  const initialThumb = location.state?.thumb || "";

  const [meta, setMeta] = useState(initialMeta);
  const [assetData, setAssetData] = useState(null); // asset APIden gelen tam dosya listesi
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // nasa asset detaylarını çekiyoruz
  useEffect(() => {
    if (!nasaId) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError("");

      try {
        const collection = await getNasaAssetDetails(nasaId);
        setAssetData(collection);

        // API daha güncel metadata sağlıyorsa onu kullan
        const metaFromApi = collection?.items?.[0]?.data?.[0];
        if (metaFromApi && !meta) setMeta(metaFromApi);
      } catch (err) {
        setError("could not load extra details from nasa api.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nasaId]);

  // gösterilecek görsel
  const mainImage =
    assetData?.items?.[0]?.href || initialThumb || "";

  // mp4 varsa videoyu oynat
  const videoUrl = assetData?.items
    ?.map((item) => item.href)
    .filter(Boolean)
    .find((href) => href.endsWith(".mp4"));

  return (
    <main className="page">
      <div className="page-inner">

        {/* arama sonuçlarına geri dönüş */}
        <button
          type="button"
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← back to results
        </button>

        {loading && <p className="status-text">loading details...</p>}
        {error && <p className="status-text error">{error}</p>}

        {/* başlık + açıklama */}
        {meta && (
          <section className="detail-header">
            <h1 className="detail-title">{meta.title}</h1>

            {meta.date_created && (
              <p className="detail-meta">
                created at: {new Date(meta.date_created).toLocaleDateString()}
              </p>
            )}

            <p className="detail-description">{meta.description}</p>
          </section>
        )}

        {/* video varsa video player */}
        {videoUrl && (
          <section className="detail-image-wrapper">
            <video className="detail-image" src={videoUrl} controls />
          </section>
        )}

        {/* yalnızca görsel varsa */}
        {!videoUrl && mainImage && (
          <section className="detail-image-wrapper">
            <img
              className="detail-image"
              src={mainImage}
              alt={meta?.title || nasaId}
            />
          </section>
        )}

        {/* hiçbir veri yoksa fallback */}
        {!loading && !error && !meta && (
          <p className="status-text empty">
            could not load metadata for this asset.
          </p>
        )}
      </div>
    </main>
  );
}

export default DetailPage;
