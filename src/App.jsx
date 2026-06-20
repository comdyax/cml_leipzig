import { Routes, Route } from "react-router";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import MapPage from "./pages/MapPage";
import News from "./pages/News";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import styles from "./App.module.css";

function App() {
  return (
    <div className={styles.app}>
      <Navigation />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/news" element={<News />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
