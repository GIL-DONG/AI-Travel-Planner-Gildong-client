import SearchItem from './SearchItem';
import styles from './styles.module.scss';

const addressList = [
  '서울특별시 강남구',
  '서울특별시 강동구',
  '서울특별시 강북구',
  '서울특별시 강서구',
  '서울특별시 관악구',
];
export default function SearchItems() {
  return (
    <ul className={styles.container}>
      {addressList.map((el, idx) => (
        <SearchItem key={idx} address={el} />
      ))}
    </ul>
  );
}
