import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { VALIDATION_MESSAGE } from '@/constants/signUp';
import { nameState } from '@/store/atom/signUpAtom';
import styles from './styles.module.scss';

interface NickNameProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  validation?: boolean;
}

export default function NickName({
  value,
  onChange,
  validation,
}: NickNameProps) {
  const name = useRecoilValue(nameState);
  const classNameValues = classNames(styles.message, {
    [styles.possible]: validation,
  });

  return (
    <div className={styles.container}>
      <input
        id="name"
        className={styles.name}
        value={value}
        onChange={onChange}
      />
      <p className={classNameValues}>
        {value && value !== name
          ? validation
            ? VALIDATION_MESSAGE.possible
            : VALIDATION_MESSAGE.impossible
          : ''}
      </p>
    </div>
  );
}
