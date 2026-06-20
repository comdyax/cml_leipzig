import ReactMarkdown from "react-markdown";
import AudioPlayer from "../AudioPlayer";
import styles from "./PodcastList.module.css";

function PodcastList({ episodes, heading, intro }) {
  if (!episodes.length) return null;

  return (
    <section className={styles.section}>
      {heading && <h2 className={styles.heading}>{heading}</h2>}
      {intro && <p className={styles.intro}>{intro}</p>}
      <div className={styles.list}>
        {episodes.map((episode) => (
          <article key={episode.data.id} className={`card ${styles.card}`}>
            <p className="label">Folge {episode.data.episode}</p>
            <h3 className={styles.title}>
              {episode.data.name}
              <span className={styles.city}> · {episode.data.city}</span>
            </h3>
            {episode.data.guest && (
              <p className={styles.guest}>
                Im Gespräch mit {episode.data.guest}
              </p>
            )}
            {episode.content.trim() && (
              <div className={styles.body}>
                <ReactMarkdown>{episode.content}</ReactMarkdown>
              </div>
            )}
            {episode.data.podcast && (
              <div className={styles.audio}>
                <AudioPlayer
                  key={episode.data.podcast}
                  src={episode.data.podcast}
                />
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export default PodcastList;
