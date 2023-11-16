import { SetStateAction } from 'react';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { residenceType } from '@/types/signUp';
import useIntersectionObserver from '@/hooks/useIntersectonObserver';
import LoadingSpinner from '../../LoadingSpinner';
import SearchItem from './SearchItem';
import styles from './styles.module.scss';

interface SearchItemsProps {
  residenceList: residenceType[];
  isSearching: boolean;
  hasNextPage: boolean;
  keyword: string;
  getMoreItem: () => Promise<void>;
  setInputText: React.Dispatch<SetStateAction<string>>;
}

export default function SearchItems({
  residenceList,
  isSearching,
  hasNextPage,
  keyword,
  getMoreItem,
  setInputText,
}: SearchItemsProps) {
  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    if (isSearching) return;
    if (isIntersecting) getMoreItem();
  };
  const { setTarget } = useIntersectionObserver({ onIntersect });

  return (
    <ul className={styles.container}>
      {residenceList?.map((el, idx) => (
        <SearchItem
          key={idx}
          residence={el}
          keyword={keyword}
          setInputText={setInputText}
        />
      ))}
      {isSearching && (
        <span className={styles.loading}>
          <LoadingSpinner />
        </span>
      )}
      {!isSearching && hasNextPage && (
        <span className={styles.ellipsis} ref={setTarget}>
          <AiOutlineEllipsis />
        </span>
      )}
    </ul>
  );
}
