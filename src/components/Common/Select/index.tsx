import React, { SetStateAction } from 'react';
import styles from './styles.module.scss';

interface SelectProps {
  label: string;
  selectList: string[];
  selectedItem?: string;
  setSelectedItem: React.Dispatch<SetStateAction<string>>;
}

export default function Select({
  label,
  selectList,
  selectedItem,
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
      defaultValue={selectedItem || 'default'}
    >
      <option value="default" disabled>
        ---- 선택 ----
      </option>
      {selectList.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}
