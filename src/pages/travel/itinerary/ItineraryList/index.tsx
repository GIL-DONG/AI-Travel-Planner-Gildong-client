import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { getItineraryListAPI } from '@/services/travel';
import { ItineraryTypes } from '@/types/travel';
import useStatus from '@/hooks/useStatus';
import Loading from '@/components/common/Loading';
import ItineraryMenuBox from '@/components/travel/ItineraryMenuBox';
import ItineraryItem from '@/components/travel/ItineraryItem';
import styles from './styles.module.scss';

export default function ItineraryList() {
  const [itineraryList, setItineraryList] = useState<ItineraryTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  useStatus('itineraryList', '여행일정');

  const getItineraryList = async () => {
    setIsLoading(true);
    const response = await getItineraryListAPI();
    if (response?.data) {
      setItineraryList(response?.data?.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItineraryList();
  }, []);

  return (
    <>
      <Helmet>
        <title>Itinerary</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <main className={styles.pageWrapper}>
          <ul className={styles.container}>
            {itineraryList.map((el, index) => (
              <ItineraryItem
                key={index}
                item={el}
                setIsMenuModalOpen={setIsMenuModalOpen}
              />
            ))}
          </ul>
          <ItineraryMenuBox
            isManuModalOpen={isMenuModalOpen}
            setItineraryList={setItineraryList}
            setIsMenuModalOpen={setIsMenuModalOpen}
          />
        </main>
      )}
    </>
  );
}
