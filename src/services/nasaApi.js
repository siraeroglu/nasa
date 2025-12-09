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
 * Belirli bir NASA asseti için detayları getirir.
 */
export async function getNasaAssetDetails(nasaId) {
  const url = `https://images-api.nasa.gov/asset/${nasaId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("failed to fetch nasa asset details");
  }

  const data = await response.json();

  // asset API gerçek medya dosyalarını collection.items dizisinde döner
  return data?.collection?.items || [];
}
