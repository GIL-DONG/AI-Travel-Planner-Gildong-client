import { BiSearch } from 'react-icons/bi';
import styles from './styles.module.scss';

interface SearchItemProps {
  address: string;
}
export default function SearchItem({ address }: SearchItemProps) {
  return (
    <li className={styles.container}>
      <div className={styles.icon}>
        <BiSearch />
      </div>
      {address}
    </li>
  );
}
