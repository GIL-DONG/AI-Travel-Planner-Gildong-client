import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { BiSearch } from 'react-icons/bi';
import { residenceState } from '@/store/atom/signUpAtom';
import useSearch from '@/hooks/useSearch';
import useDebounce from '@/hooks/useDebounce';
import useToggleModal from '@/hooks/useToggleModal';
import Button from '../Button';
import SearchItems from './SearchItems';
import styles from './styles.module.scss';

export default function SearchBar() {
  const residence = useRecoilValue(residenceState);
  const [inputText, setInputText] = useState('');
  const debouncedInputText = useDebounce(inputText);
  const { isModalOpen, setIsModalOpen, setTarget } = useToggleModal();
  const { isSearching, residenceList, hasNextPage, getMoreItem } =
    useSearch(debouncedInputText);

  return (
    <div className={styles.container} ref={setTarget}>
      <div className={styles.search}>
        <input
          className={styles.input}
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          onFocus={() => setIsModalOpen(true)}
          autoFocus
        />
        <span className={styles.icon}>
          <Button
            variant="pure"
            size="sm"
            color="primary"
            icon={<BiSearch />}
            iconBtn={true}
          />
        </span>
      </div>
      {isModalOpen && residenceList.length > 0 && (
        <SearchItems
          residenceList={residenceList}
          isSearching={isSearching}
          hasNextPage={hasNextPage}
          getMoreItem={getMoreItem}
          keyword={debouncedInputText}
          setInputText={setInputText}
        />
      )}
      {residence && (
        <div className={styles.departure}>
          <span>출발지</span>
          <span className={styles.residence}>{residence?.word}</span>
        </div>
      )}
    </div>
  );
}
