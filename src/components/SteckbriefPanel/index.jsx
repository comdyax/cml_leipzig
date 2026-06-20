import ReactMarkdown from "react-markdown";
import AudioPlayer from "../AudioPlayer";
import styles from "./SteckbriefPanel.module.css";

function formatShortDate(dateStr) {
  if (!dateStr) return null;
  return new Date(dateStr).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "short",
  });
}

function LocationList({ venues, onVenueSelect }) {
  const sorted = [...venues]
    .filter((v) => v.data.date)
    .sort((a, b) => new Date(a.data.date) - new Date(b.data.date));
  const noDate = venues.filter((v) => !v.data.date);

  return (
    <div className={styles.panel}>
      <p className="label">Spielorte</p>
      <ul className={styles.list}>
        {sorted.map((venue) => (
          <li
            key={venue.data.id}
            className={styles.listItem}
            onClick={() => onVenueSelect(venue)}
          >
            <time className={styles.listDate}>{formatShortDate(venue.data.date)}</time>
            <div>
              <span className={styles.listName}>{venue.data.name}</span>
              <span className={styles.listCity}>{venue.data.city}</span>
            </div>
          </li>
        ))}
        {noDate.map((venue) => (
          <li
            key={venue.data.id}
            className={styles.listItem}
            onClick={() => onVenueSelect(venue)}
          >
            <time className={styles.listDate}>Podcast</time>
            <div>
              <span className={styles.listName}>{venue.data.name}</span>
              <span className={styles.listCity}>{venue.data.city}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SteckbriefPanel({ venue, venues, onVenueSelect, onClose }) {
  if (!venue) {
    return <LocationList venues={venues} onVenueSelect={onVenueSelect} />;
  }

  return (
    <div className={styles.panel}>
      <button className={styles.back} onClick={onClose}>
        ← Alle Spielorte
      </button>

      <p className="label" style={{ marginTop: "0.5rem" }}>Steckbrief</p>
      <h2 className={styles.name}>{venue.data.name}</h2>
      <p className={styles.city}>— {venue.data.city}</p>

      <div className={styles.body}>
        <ReactMarkdown>{venue.content}</ReactMarkdown>
      </div>

      {venue.data.podcast && (
        <div className={styles.section}>
          <p className="label">Kurzreportage</p>
          <AudioPlayer key={venue.data.podcast} src={venue.data.podcast} />
        </div>
      )}

      {venue.data.weblink && (
        <a
          href={venue.data.weblink}
          className={styles.siteLink}
          target="_blank"
          rel="noreferrer"
        >
          → Zur Website des Veranstalters
        </a>
      )}

      {venue.data.concert && (
        <div className={styles.section}>
          <p className="label">Nächstes Konzert</p>
          <p className={styles.concert}>{venue.data.concert}</p>
        </div>
      )}
    </div>
  );
}

export default SteckbriefPanel;
