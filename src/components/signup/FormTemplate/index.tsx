import { ReactNode } from 'react';
import Button from '@components/common/Button';
import ProgressBar from '../ProgressBar';
import styles from './styles.module.scss';

interface FormTemplateProps {
  page: string;
  title: string;
  text: string;
  button: string;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  children?: ReactNode;
}

export default function FormTemplate({
  page,
  title,
  text,
  button,
  setIndex,
  children,
}: FormTemplateProps) {
  const handleNext = () => {
    setIndex((prev) => prev + 1);
  };

  const handleBack = () => {
    setIndex((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log('완료');
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <div>
          <div className={styles.progressBar}>
            <ProgressBar page={page} />
          </div>
          <div>
            <div className={styles.title}>{title}</div>
            <div className={styles.text}>{text}</div>
          </div>
          <div className={styles.content}>{children}</div>
        </div>
        {button === 'start' ? (
          <Button variant="primary" full={true} size="lg" onClick={handleNext}>
            다음
          </Button>
        ) : button === 'middle' ? (
          <div className={styles.btn}>
            <Button
              variant="lined"
              color="primary"
              full={true}
              size="lg"
              onClick={handleBack}
            >
              이전
            </Button>
            <Button
              variant="primary"
              full={true}
              size="lg"
              onClick={handleNext}
            >
              다음
            </Button>
          </div>
        ) : (
          <div className={styles.btn}>
            <Button
              variant="lined"
              color="primary"
              full={true}
              size="lg"
              onClick={handleBack}
            >
              이전
            </Button>
            <Button
              type="submit"
              variant="primary"
              full={true}
              size="lg"
              onClick={handleSubmit}
            >
              완료
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
