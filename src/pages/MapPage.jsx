import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { useVenues, useNews } from "../hooks/useMarkdown";
import Map from "../components/Map";
import SteckbriefPanel from "../components/SteckbriefPanel";
import ConcertList from "../components/ConcertList";
import PodcastList from "../components/PodcastList";
import karteContent from "../content/karte.md";
import styles from "./MapPage.module.css";

function MapPage() {
  const venues = useVenues();
  const concerts = useNews({
    type: "concert",
    project: "Keimzelle Sachsen",
    upcoming: true,
  });
  const [selectedVenue, setSelectedVenue] = useState(null);
  const { data, content } = karteContent;

  const episodes = [...venues]
    .filter((venue) => venue.data.episode)
    .sort((a, b) => a.data.episode - b.data.episode);

  return (
    <div className="page">
      <div className={styles.intro}>
        <p className={`label ${styles.tag}`}>{data.tag}</p>
        <h1 className={styles.heading}>{data.heading}</h1>
        <div className={styles.desc}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>

      <ConcertList concerts={concerts} heading="Kommende Konzerte" />

      <div className={styles.mapSection}>
        <div className={styles.mapIntro}>
          <h2 className={styles.mapHeading}>{data.mapHeading}</h2>
          {data.mapIntro && (
            <p className={styles.mapCaption}>{data.mapIntro}</p>
          )}
        </div>
        <div className={`card ${styles.mapCard}`}>
          <Map
            venues={episodes}
            selectedVenue={selectedVenue}
            onVenueSelect={setSelectedVenue}
            consent={data.consent}
          />
          <SteckbriefPanel
            venue={selectedVenue}
            venues={episodes}
            onVenueSelect={setSelectedVenue}
            onClose={() => setSelectedVenue(null)}
          />
        </div>

        <PodcastList episodes={episodes} />
      </div>
    </div>
  );
}

export default MapPage;
