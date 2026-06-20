import ReactMarkdown from "react-markdown";
import datenschutzContent from "../content/datenschutz.md";
import styles from "./LegalPage.module.css";

function Datenschutz() {
  const { data, content } = datenschutzContent;
  return (
    <div className="page">
      <div className={styles.page}>
        <h1>{data.title}</h1>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Datenschutz;
