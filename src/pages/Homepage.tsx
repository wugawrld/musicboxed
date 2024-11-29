import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Charts from "../components/Charts";
import AlbumCarousel from "../components/AlbumCarousel";

const HomePage = () => {
  return (
    <div id="homepage" className="container-fluid">
      <NavBar />
      <div className="homepage-container">
        <div className="row">
          <div className="col-md-6">
            <div id="top-songs">
              <Charts />
            </div>
          </div>
          <div className="col-md-6">
            <div id="main-content">
              <AlbumCarousel />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
