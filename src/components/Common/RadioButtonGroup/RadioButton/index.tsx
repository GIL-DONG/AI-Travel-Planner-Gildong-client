import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface RadioProps {
  id: string;
  value: string;
  name: string;
  children?: ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultChecked?: boolean;
  disabled?: boolean;
}

export default function RadioButton({
  id,
  value,
  name,
  children,
  onChange,
  defaultChecked,
  disabled,
}: RadioProps) {
  return (
    <li className={styles.radioBtn}>
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <label htmlFor={id}>{children || value}</label>
    </li>
  );
}
