import React, { SetStateAction } from 'react';
import styles from './styles.module.scss';

interface SelectProps {
  label: string;
  selectList: string[];
  setSelectedItem: React.Dispatch<SetStateAction<string>>;
}

export default function Select({
  label,
  selectList,
  setSelectedItem,
}: SelectProps) {
  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
  };

  return (
    <select
      className={styles.select}
      name={label}
      aria-labelledby={label}
      onChange={selectHandler}
    >
      {selectList.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
