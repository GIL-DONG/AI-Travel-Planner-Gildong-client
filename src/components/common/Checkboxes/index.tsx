import Checkbox from './Checkbox';
import styles from './styles.module.scss';

interface CheckboxesProps {
  label: string;
  checkBoxList: string[];
  checkedList: string[];
  setCheckedList: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function Checkboxes({
  label,
  checkBoxList,
  checkedList,
  setCheckedList,
}: CheckboxesProps) {
  const checkedItemHandler = (value: string, isChecked: boolean) => {
    if (isChecked) {
      setCheckedList((prev) => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter((item) => item !== value));
      return;
    }
    return;
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: string,
  ) => {
    checkedItemHandler(value, e.target.checked);
  };

  return (
    <ul role="group" aria-labelledby={label} className={styles.chk_boxs}>
      {checkBoxList.map((item, idx) => (
        <Checkbox
          id={item}
          key={idx}
          name={label}
          value={item}
          onChange={(event) => checkHandler(event, item)}
        />
      ))}
    </ul>
  );
}
