import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface InputTemplateProps {
  id?: string;
  htmlFor?: string;
  name: string;
  children?: ReactNode;
}

export default function InputTemplate({
  id,
  htmlFor,
  name,
  children,
}: InputTemplateProps) {
  return (
    <div className={styles.container}>
      <label id={id} htmlFor={htmlFor} className={styles.label}>
        {name}
      </label>
      {children}
    </div>
  );
}
