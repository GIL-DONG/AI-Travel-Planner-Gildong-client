import styles from './styles.module.scss';

interface CheckboxProps {
  value: string;
  isChecked: boolean;
}

export default function Checkbox({ value, isChecked }: CheckboxProps) {
  return (
    <>
      {isChecked ? (
        <label
          className={`${styles.wrapper} ${styles.checked}`}
          htmlFor={value}
        >
          <input type="checkbox" className={styles.checkboxInput} id={value} />
          {value}
        </label>
      ) : (
        <label className={styles.wrapper} htmlFor={value}>
          <input type="checkbox" className={styles.checkboxInput} id={value} />
          {value}
        </label>
      )}
    </>
  );
}
