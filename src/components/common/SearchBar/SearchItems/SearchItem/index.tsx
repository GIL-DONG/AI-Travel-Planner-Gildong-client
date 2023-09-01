import { BiSearch } from 'react-icons/bi';
import styles from './styles.module.scss';
export default function SearchItem({ address }: { address: string }) {
  return (
    <li className={styles.container}>
      <div className={styles.icon}>
        <BiSearch />
      </div>
      {address}
    </li>
  );
}
