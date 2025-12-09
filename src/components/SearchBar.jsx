// arama input’u, medya türü seçimi ve arama butonunu içeren kontrollü form bileşeni

function SearchBar({
  query,
  mediaType = "all",
  onChange,
  onMediaChange = () => {},
  onSubmit,
}) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        className="search-input"
        type="text"
        placeholder="Search for NASA media..."
        value={query}
        onChange={(e) => onChange(e.target.value)} // üst bileşene input değişikliğini iletir
      />

      {/* medya türü filtresi */}
      <select
        className="search-select"
        value={mediaType}
        onChange={(e) => onMediaChange(e.target.value)} // seçilen medya türünü bildirir
      >
        <option value="all">All media</option>
        <option value="image">Images</option>
        <option value="video">Videos</option>
      </select>

      <button className="search-button" type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;
