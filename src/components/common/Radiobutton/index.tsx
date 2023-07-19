import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface RadioProps {
  id: string;
  value: string;
  name: string;
  children: ReactNode;
  defaultChecked?: boolean;
  disabled?: boolean;
}
export default function Radiobutton({
  id,
  value,
  name,
  children,
  defaultChecked,
  disabled,
}: RadioProps) {
  return (
    <div className={styles.radio}>
      <input
        type="radio"
        id={id}
        value={value}
        name={name}
        defaultChecked={defaultChecked}
        disabled={disabled}
      />
      <label htmlFor={id}>{children}</label>
    </div>
  );
}
