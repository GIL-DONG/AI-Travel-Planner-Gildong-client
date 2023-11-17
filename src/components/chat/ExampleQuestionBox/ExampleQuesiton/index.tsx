import styles from './styles.module.scss';

interface ExampleQuestionProps {
  question: string;
  imageUrl?: string;
  src: string;
  clickHandler: (question: string, imageUrl?: string | undefined) => void;
}

export default function ExampleQuestion({
  clickHandler,
  question,
  imageUrl,
  src,
}: ExampleQuestionProps) {
  return (
    <li
      className={styles.container}
      onClick={() => clickHandler(question, imageUrl)}
    >
      <span className={styles.question}>{question}</span>
      <span className={styles.image}>
        <img src={src} />
      </span>
    </li>
  );
}
