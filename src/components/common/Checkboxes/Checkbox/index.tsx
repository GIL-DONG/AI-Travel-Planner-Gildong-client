import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface CheckboxProps {
  id: string;
  value: string;
  name?: string;
  children?: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
}

export default function Checkbox({
  id,
  value,
  name,
  children,
  onChange,
  checked,
  disabled,
}: CheckboxProps) {
  return (
    <li className={styles.chk_box}>
      <input
        type="checkbox"
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        checked={checked}
        disabled={disabled}
      />
      <label htmlFor={id}>{children || value}</label>
    </li>
  );
}
