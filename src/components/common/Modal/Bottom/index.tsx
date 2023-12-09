import { ReactNode } from 'react';
import classNames from 'classnames';
import { IoMdClose } from 'react-icons/io';
import useIsModalOpen from '@/hooks/useIsModalOpen';
import Button from '../../Button';
import styles from './styles.module.scss';

interface ModalProps {
  variant?: 'default' | 'primary';
  isModalOpen: boolean;
  onClickCloseModal: () => void;
  children: ReactNode;
}

interface VariantTypes {
  default: string;
  primary: string;
}

const VARIANTS: VariantTypes = {
  default: styles.modal_main__default,
  primary: styles.modal_main__primary,
};

export default function ModalBottom({
  variant = 'default',
  isModalOpen,
  onClickCloseModal,
  children,
}: ModalProps) {
  const isOpen = useIsModalOpen(isModalOpen, 100);
  if (!isOpen) return null;

  return (
    <div
      className={
        isOpen
          ? `${styles.modal} ${styles.modal__opened}`
          : `${styles.modal} ${styles.closed}`
      }
      onClick={onClickCloseModal}
    >
      <div
        className={styles.modal_container}
        onClick={(event) => event.stopPropagation()}
      >
        <section
          className={
            isModalOpen
              ? `${styles.modal_section} ${styles.modal_section__opened}`
              : `${styles.modal_section} ${styles.modal_section__closed}`
          }
        >
          <main
            className={classNames(
              VARIANTS[variant as keyof VariantTypes],
              styles.modal_main,
            )}
          >
            <span className={styles.modal_button} />
            <div className={styles.modal_delete_button}>
              <Button
                size="sm"
                icon={<IoMdClose />}
                iconBtn={true}
                onClick={onClickCloseModal}
                label="닫기"
              >
                닫기
              </Button>
            </div>
            {children}
          </main>
        </section>
      </div>
    </div>
  );
}
