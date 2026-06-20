import { useState } from "react";
import { NavLink } from "react-router";
import styles from "./Navigation.module.css";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const close = () => setIsOpen(false);
  const linkClass = ({ isActive }) =>
    isActive ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" end className={styles.logoLink} onClick={close}>
          <span className={styles.logoName}>Creative Music Leipzig</span>
          <span className={styles.logoTagline}>Improvisation Sachsen</span>
        </NavLink>

        <button
          className={styles.hamburger}
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? "Menü schließen" : "Menü öffnen"}
          aria-expanded={isOpen}
        >
          {isOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="16" y2="16" />
              <line x1="16" y1="4" x2="4" y2="16" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="3" y1="5" x2="17" y2="5" />
              <line x1="3" y1="10" x2="17" y2="10" />
              <line x1="3" y1="15" x2="17" y2="15" />
            </svg>
          )}
        </button>

        <div className={`${styles.links} ${isOpen ? styles.linksOpen : ""}`}>
          <NavLink to="/" end className={linkClass} onClick={close}>
            Startseite
          </NavLink>
          <NavLink to="/map" className={linkClass} onClick={close}>
            Keimzelle Sachsen
          </NavLink>
          {/* <NavLink to="/news" className={linkClass} onClick={close}>News & Termine</NavLink> */}
          {/* TODO: New Components: Musician Portraits */}
        </div>
      </nav>
    </header>
  );
}

export default Navigation;
