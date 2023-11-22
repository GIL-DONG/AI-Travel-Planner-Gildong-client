import styles from './styles.module.scss';

interface ProgressBarProps {
  page: string;
}

interface PageTypes {
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
}

const PAGES: PageTypes = {
  first: styles.first,
  second: styles.second,
  third: styles.third,
  fourth: styles.fourth,
  fifth: styles.fifth,
};

export default function ProgressBar({ page }: ProgressBarProps) {
  return (
    <div className={styles.progressBar}>
      <div
        className={`${styles.hightlight} ${PAGES[page as keyof PageTypes]}`}
      ></div>
    </div>
  );
}
