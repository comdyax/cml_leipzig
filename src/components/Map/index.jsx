import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import { Link } from "react-router";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

const SAXONY_CENTER = [51.1, 13.2];
const DEFAULT_ZOOM = 8;
const CONSENT_KEY = "tileConsent";

function createDotIcon(isSelected) {
  return L.divIcon({
    className: "",
    html: `<div style="
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: ${isSelected ? "#c8563a" : "#1a1a1a"};
      border: 2px solid #ffffff;
      box-sizing: border-box;
      box-shadow: 0 1px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
}

function MapFlyController({ venue }) {
  const map = useMap();
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    if (venue) {
      map.flyTo([venue.data.lat, venue.data.lng], 12, { duration: 1 });
    } else {
      map.flyTo(SAXONY_CENTER, DEFAULT_ZOOM, { duration: 1.2 });
    }
  }, [venue, map]);
  return null;
}

function Map({ venues, selectedVenue, onVenueSelect, consent }) {
  const [granted, setGranted] = useState(
    () => localStorage.getItem(CONSENT_KEY) === "granted"
  );

  function grantConsent() {
    localStorage.setItem(CONSENT_KEY, "granted");
    setGranted(true);
  }

  if (!granted) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.consent}>
          <h2 className={styles.consentTitle}>{consent.title}</h2>
          <p className={styles.consentBody}>{consent.body}</p>
          <button
            type="button"
            className={styles.consentButton}
            onClick={grantConsent}
          >
            {consent.button}
          </button>
          <Link to="/datenschutz" className={styles.consentLink}>
            {consent.link}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <MapContainer
        center={SAXONY_CENTER}
        zoom={DEFAULT_ZOOM}
        className={styles.map}
      >
        <MapFlyController venue={selectedVenue} />
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        {venues.map((venue) => {
          const isSelected = selectedVenue?.data.id === venue.data.id;
          return (
            <Marker
              key={venue.data.id}
              position={[venue.data.lat, venue.data.lng]}
              icon={createDotIcon(isSelected)}
              eventHandlers={{ click: () => onVenueSelect(venue) }}
            >
              <Tooltip>{venue.data.city}</Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;
