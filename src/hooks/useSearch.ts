import { useEffect, useState } from 'react';
import { DEFAULT_NEXT_PAGE, DEFAULT_PAGE, LIMIT } from '@/constants/signUp';
import { getSearchResidenceAPI } from '@/services/signUp';
import { residenceTypes } from '@/types/signUp';

export default function useSearch(inputText: string) {
  const [isSearching, setIsSearching] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [nextPage, setNextPage] = useState(DEFAULT_NEXT_PAGE);
  const [residenceList, setResidenceList] = useState<residenceTypes[]>([]);

  const getMoreItem = async () => {
    if (!hasNextPage) return;

    setIsSearching(true);

    try {
      const trimmedText = inputText.trim();
      const response = await getSearchResidenceAPI(trimmedText, nextPage);
      const { result, total } = response;

      setResidenceList((prev) => [...prev, ...result]);

      if (LIMIT * (nextPage - DEFAULT_PAGE) + result?.length >= total)
        setHasNextPage(false);
      setNextPage((prev) => prev + 1);
    } catch (error) {
      console.error(error);
      alert('Something went wrong.');
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    setNextPage(DEFAULT_NEXT_PAGE);

    const fetchAutocompleteWords = async () => {
      const trimmedText = inputText.trim();
      if (!trimmedText) {
        setResidenceList([]);
        return;
      }

      try {
        setIsSearching(true);

        const response = await getSearchResidenceAPI(trimmedText, 1);
        const { result, total } = response;

        if (LIMIT * (1 - DEFAULT_PAGE) + result?.length < total)
          setHasNextPage(true);
        setResidenceList(result);
      } catch (error) {
        console.error(error);
        alert('Something went wrong.');
      } finally {
        setIsSearching(false);
      }
    };

    fetchAutocompleteWords();
  }, [inputText]);

  return {
    isSearching,
    residenceList,
    hasNextPage,
    getMoreItem,
  };
}
