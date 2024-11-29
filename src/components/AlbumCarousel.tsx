import { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import AlbumComments from "./AlbumComments";

const AlbumCarousel = () => {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);
  const [carouselIsActive, setCarouselIsActive] = useState(true);

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        const tokenResponse = await axios.post('http://localhost:3000/api/token');
        const accessToken = tokenResponse.data.access_token;

        const albumsResponse = await axios.get("https://api.spotify.com/v1/browse/new-releases", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        setAlbums(albumsResponse.data.albums.items.slice(0, 10));
      } catch (error) {
        console.error("Failed to fetch albums:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessToken();
  }, []);

  const handleAlbumSelect = (albumId: string) => {
    setSelectedAlbumId(albumId);
    setCarouselIsActive(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!albums.length) {
    return <div>No albums found</div>;
  }

  return (
    <div className="carousel-container mt-4">
      <h2>Trending Albums</h2>
      <div id="albumCarousel" className={`carousel slide ${carouselIsActive ? "active" : ""}`} data-bs-ride="carousel">
        <div className="carousel-inner">
          {albums.map((album, index) => (
            <div
              key={album.id}
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              onClick={() => handleAlbumSelect(album.id)}
            >
              <div className="album-card">
                <img
                  src={album.images[0]?.url}
                  alt={album.name}
                  className="album-image"
                />
                <div className="album-info">
                  <h5 className="album-title">{album.name}</h5>
                  <p className="artist-name">{album.artists[0]?.name}</p>
                  <p className="text-muted">{album.release_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#albumCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#albumCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {selectedAlbumId && (
        <div className="comments-section">
          <h3>Comments for Selected Album</h3>
          <AlbumComments albumId={selectedAlbumId} />
        </div>
      )}
    </div>
  );
};

export default AlbumCarousel;
