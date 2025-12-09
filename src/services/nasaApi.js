// NASA Media API için küçük servis katmanı

const BASE_URL = "https://images-api.nasa.gov/search";

/**
 * arama terimi ve filtrelere göre NASA'dan medya listesi döner.
 */
export async function searchNasaImages(query, page = 1, media = "all") {
  let mediaParam;

  // seçilen türü NASA API'nin beklediği formata çeviriyoruz
  if (media === "image") mediaParam = "image";
  else if (media === "video") mediaParam = "video";
  else mediaParam = "image,video";

  const params = new URLSearchParams({
    q: query,
    media_type: mediaParam,
    page: String(page),
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error("failed to fetch nasa media");
  }

  const data = await response.json();

  // NASA listeyi collection.items içinde döner
  return data?.collection?.items || [];
}

/**
 * tek bir NASA asset detayını almak için kullanılan fonksiyon
 * DetailPage bu fonksiyonu kullanıyor
 */
export async function getNasaAssetDetails(nasaId) {
  const url = `https://images-api.nasa.gov/asset/${nasaId}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("failed to fetch nasa asset details");
  }

  const data = await response.json();

  const items = data?.collection?.items || [];

  // görsel için uygun bir url
  const imageItem = items.find((item) =>
    typeof item.href === "string" &&
    /\.(jpg|jpeg|png)$/i.test(item.href)
  );

  // video için uygun bir url
  const videoItem = items.find((item) =>
    typeof item.href === "string" &&
    /\.(mp4|m4v|mov)$/i.test(item.href)
  );

  return {
    items,
    imageUrl: imageItem ? imageItem.href : null,
    videoUrl: videoItem ? videoItem.href : null,
  };
}

