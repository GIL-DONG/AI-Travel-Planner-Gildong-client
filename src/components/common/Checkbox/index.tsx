import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface CheckboxProps {
  id: string;
  value: string;
  name: string;
  children: ReactNode;
  disabled?: boolean;
}

export default function Checkbox({
  id,
  value,
  name,
  children,
  disabled,
}: CheckboxProps) {
  return (
    <div className={styles.chk_box}>
      <input
        type="checkbox"
        id={id}
        value={value}
        name={name}
        disabled={disabled}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
