import React, { SetStateAction } from 'react';
import RadioButton from './RadioButton';
import styles from './styles.module.scss';

interface RadioButtonGroupProps {
  label: string;
  radioButtonlist: string[];
  setValue: React.Dispatch<SetStateAction<string>>;
}

export default function RadioButtonGroup({
  label,
  radioButtonlist,
  setValue,
}: RadioButtonGroupProps) {
  const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <ul role="group" aria-labelledby={label} className={styles.radioBtns}>
      {radioButtonlist.map((item, idx) => (
        <RadioButton
          id={item}
          key={idx}
          name={label}
          value={item}
          onChange={radioHandler}
        />
      ))}
    </ul>
  );
}
