import ReactMarkdown from "react-markdown";
import { useNews } from "../../hooks/useMarkdown";
import { formatDate } from "../../utils/date";
import styles from "./NewsEvents.module.css";

function NewsEvents() {
  const news = useNews();

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>News & Events</h2>
        <div className={styles.grid}>
          {news.map((item) => (
            <article key={item.data.title} className={styles.card}>
              <span
                className={`${styles.badge} ${item.data.type === "concert" ? styles.event : ""}`}
              >
                {item.data.type === "concert" ? "Konzert" : "News"}
              </span>
              <h3 className={styles.cardTitle}>{item.data.title}</h3>
              <time className={styles.date}>{formatDate(item.data.date)}</time>
              {item.data.location && (
                <p className={styles.location}>{item.data.location}</p>
              )}
              {item.data.weblink && (
                <a
                  href={item.data.weblink}
                  className={styles.siteLink}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.data.weblink}
                </a>
              )}
              <div className={styles.body}>
                <ReactMarkdown>{item.content}</ReactMarkdown>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default NewsEvents;
