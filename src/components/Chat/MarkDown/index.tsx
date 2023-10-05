import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useState, useEffect } from 'react';
import styles from './styles.module.scss';

interface MarkDownProps {
  text: string;
}

export default function MarkDown({ text }: MarkDownProps) {
  const [content, setContent] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const typingText = text || '';
    const interval = setInterval(() => {
      setContent((prev) => prev + typingText[count]);
      setCount(count + 1);
    }, 40);
    count === typingText.length && clearInterval(interval);
    return () => clearInterval(interval);
  }, [text, count]);
  return (
    <ReactMarkdown
      className={styles.markdown}
      children={content}
      remarkPlugins={[remarkGfm]}
    />
  );
}
