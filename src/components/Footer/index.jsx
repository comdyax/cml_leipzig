import { Link } from "react-router";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>© {new Date().getFullYear()} Creative Music Leipzig GbR</p>

        <nav className={styles.links}>
          <Link to="/impressum">Impressum</Link>
          <Link to="/datenschutz">Datenschutz</Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
