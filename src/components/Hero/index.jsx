import ReactMarkdown from "react-markdown";
import homeContent from "../../content/home.md";
import styles from "./Hero.module.css";

function Hero() {
  const { data, content } = homeContent;
  return (
    <section className={styles.hero}>
      {data.heroImage && (
        <div className={styles.imageWrapper}>
          <img src={`${import.meta.env.BASE_URL}${data.heroImage.replace(/^\//, "")}`} alt={data.heroImageAlt} className={styles.image} />
        </div>
      )}
      <div className={styles.text}>
        <h1 className={styles.title}>{data.title}</h1>
        <p className={styles.subtitle}>{data.subtitle}</p>
        <div className={styles.intro}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

export default Hero;
