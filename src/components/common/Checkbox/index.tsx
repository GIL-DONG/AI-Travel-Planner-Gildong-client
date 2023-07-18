import styles from './styles.module.scss';

interface CheckboxProps {
  value: string;
}

export default function Checkbox({ value }: CheckboxProps) {
  return (
    <span className={styles.chk_box}>
      <input type="checkbox" id={value} />
      <label htmlFor={value}>{value}</label>
    </span>
  );
}
