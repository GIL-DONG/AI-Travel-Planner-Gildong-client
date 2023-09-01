import { BiSearch } from 'react-icons/bi';
import Button from '@components/common/Button';
import styles from './styles.module.scss';
export default function SearchInput() {
  return (
    <div className={styles.container}>
      <input className={styles.search} />
      <span className={styles.icon}>
        <Button size="sm" color="primary" icon={<BiSearch />} iconBtn={true} />
      </span>
    </div>
  );
}
