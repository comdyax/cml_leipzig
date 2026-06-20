import { formatDate } from "../../utils/date";
import styles from "./ConcertList.module.css";

function ConcertList({ concerts, heading }) {
  if (!concerts.length) return null;

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      <ul className={styles.list}>
        {concerts.map((item) => (
          <li key={item.data.title} className={styles.row}>
            <time className={styles.date} dateTime={item.data.date}>
              {formatDate(item.data.date)}
            </time>
            <span className={styles.location}>{item.data.location}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ConcertList;
