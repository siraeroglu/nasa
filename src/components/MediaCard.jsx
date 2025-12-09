// arama sonucundaki tek bir nasa öğesini gösteren kart bileşeni

import { Link } from "react-router-dom";

function MediaCard({ item }) {
  const data = item.data?.[0]; // nasa verisindeki asıl metadata
  const thumb = item.links?.[0]?.href; // küçük önizleme görseli
  const isVideo = data?.media_type === "video"; // video mu değil mi kontrolü

  if (!data) return null; // veri yapısı beklenmedikse kartı göstermiyoruz

  return (
    <li className="media-card">
      {/* kart tıklandığında detay sayfasına gidiyoruz */}
      <Link
        to={`/asset/${data.nasa_id}`}
        state={{ meta: data, thumb }}
        className="media-card-link"
      >
        {thumb && (
          <img
            className="media-card-thumb"
            src={thumb}
            alt={data.title}
          />
        )}

        <div className="media-card-body">
          <h2>{data.title}</h2>

          {/* video ise küçük bir rozet gösteriyoruz */}
          {isVideo && <span className="media-badge">video</span>}

          <p>{data.description || "no description available."}</p>
        </div>
      </Link>
    </li>
  );
}

export default MediaCard;
