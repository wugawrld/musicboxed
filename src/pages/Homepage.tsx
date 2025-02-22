import { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SpotifyPlayer from "../components/SpotifyPlayer";
import AlbumCarousel from "../components/AlbumCarousel";
import AlbumComments from "../components/AlbumComments";

const HomePage = () => {
  const [selectedAlbumId, setSelectedAlbumId] = useState<string | null>(null);

  return (
    <div id="homepage" className="container-fluid">
      <NavBar />
      <div className="homepage-container">
        <div className="row">
          <div className="col-md-12">
            <SpotifyPlayer playlistUrl="https://open.spotify.com/embed/playlist/37i9dQZEVXbLRQDuF5jeBp?utm_source=generator" />
          </div>
          <div className="col-md-12">
            <AlbumCarousel setSelectedAlbumId={setSelectedAlbumId} />
          </div>
        </div>
        {selectedAlbumId && (
          <div className="row mt">
            <div className="col-12">
              <AlbumComments albumId={selectedAlbumId} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
