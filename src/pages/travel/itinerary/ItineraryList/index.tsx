import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { getItineraryListAPI } from '@/services/travel';
import { ItineraryTypes } from '@/types/travel';
import useStatus from '@/hooks/useStatus';
import Loading from '@/components/common/Loading';
import ItineraryMenuBox from '@/components/travel/ItineraryMenuBox';
import ItineraryItem from '@/components/travel/ItineraryItem';
import Error from '@/pages/error/Error';
import styles from './styles.module.scss';

export default function ItineraryList() {
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  useStatus('itineraryList', '여행일정');

  const getItineraryList = async () => {
    const response = await getItineraryListAPI();
    return response.data?.data;
  };

  const { data, isLoading, isError } = useQuery<ItineraryTypes[] | undefined>(
    ['itineraryList'],
    getItineraryList,
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <Helmet>
        <title>Itinerary</title>
      </Helmet>
      <main className={styles.pageWrapper}>
        <ul className={styles.container}>
          {data?.map((el, index) => (
            <ItineraryItem
              key={index}
              item={el}
              setIsMenuModalOpen={setIsMenuModalOpen}
            />
          ))}
        </ul>
        <ItineraryMenuBox
          isManuModalOpen={isMenuModalOpen}
          setIsMenuModalOpen={setIsMenuModalOpen}
        />
      </main>
    </>
  );
}
