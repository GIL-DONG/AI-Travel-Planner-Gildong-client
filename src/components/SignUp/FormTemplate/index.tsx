import { ReactNode } from 'react';
import Header from '@/components/Common/Header';
import ProgressBar from '../ProgressBar';
import styles from './styles.module.scss';

interface FormTemplateProps {
  page: string;
  title: string;
  text: string | ReactNode;
  children?: ReactNode;
}

export default function FormTemplate({
  page,
  title,
  text,
  children,
}: FormTemplateProps) {
  return (
    <>
      {page === 'first' ? (
        <Header color="wh" back={true} page="signUp" />
      ) : null}
      <div className={styles.container}>
        <div className={styles.formWrapper}>
          <div className={styles.form}>
            <div className={styles.progressBar}>
              <ProgressBar page={page} />
            </div>
            <div>
              <div className={styles.title}>{title}</div>
              <div className={styles.text}>{text}</div>
            </div>
            <div className={styles.content}>{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
