import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import styles from './styles.module.scss';

interface MarkDownProps {
  text: string;
}

export default function MarkDown({ text }: MarkDownProps) {
  return (
    <ReactMarkdown
      className={styles.markdown}
      children={text}
      remarkPlugins={[remarkGfm]}
    />
  );
}
