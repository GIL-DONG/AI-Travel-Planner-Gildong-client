import { ReactNode } from 'react';
import useStatus from '@/hooks/useStatus';
import ProgressBar from '../ProgressBar';
import styles from './styles.module.scss';

interface FormTemplateProps {
  page: string;
  title: string;
  text?: string;
  children?: ReactNode;
}

export default function FormTemplate({
  page,
  title,
  text,
  children,
}: FormTemplateProps) {
  const { setHeaderStatus } = useStatus('signUp', '');

  if (page !== 'first') {
    setHeaderStatus({ pageName: '', title: '' });
  }
  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.form}>
          <div className={styles.progressBar}>
            {page === 'first' ? null : <ProgressBar page={page} />}
          </div>
          <div>
            <div className={styles.title}>{title}</div>
            {text ? <div className={styles.text}>{text}</div> : null}
          </div>
          <div className={text ? `${styles.content}` : ''}>{children}</div>
        </div>
      </div>
    </div>
  );
}
