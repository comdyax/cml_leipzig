import ReactMarkdown from "react-markdown";
import impressumContent from "../content/impressum.md";
import styles from "./LegalPage.module.css";

function Impressum() {
  const { data, content } = impressumContent;
  return (
    <div className="page">
      <div className={styles.page}>
        <h1>{data.title}</h1>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Impressum;
