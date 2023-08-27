import React, { SetStateAction } from 'react';
import RadioButton from './RadioButton';
import styles from './styles.module.scss';

interface RadioButtonGroupProps {
  label: string;
  radioButtonlist: string[];
  setRadioButtonItem: React.Dispatch<SetStateAction<string>>;
}

export default function RadioButtonGroup({
  label,
  radioButtonlist,
  setRadioButtonItem,
}: RadioButtonGroupProps) {
  const radioHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRadioButtonItem(e.target.value);
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