import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { getItineraryListAPI } from '@/services/travel';
import { ItineraryTypes } from '@/types/travel';
import { ROUTE_PATHS } from '@/constants/config';
import Destinations from '@/components/travel/Destinations';
import { itineraryState, theTopState } from '@/store/atom/travelAtom';
import menu from '@/assets/menu.png';
import useStatus from '@/hooks/useStatus';
import Loading from '@/components/common/Loading';
import ItineraryMenuBox from '@/components/travel/ItineraryMenuBox';
import styles from './styles.module.scss';

export default function ItineraryList() {
  const navigate = useNavigate();
  const setTheTop = useSetRecoilState(theTopState);
  const [itineraryList, setItineraryList] = useState<ItineraryTypes[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const setItinerary = useSetRecoilState(itineraryState);
  useStatus('itineraryList', '여행 일정');

  const getItineraryList = async () => {
    setIsLoading(true);
    const data = await getItineraryListAPI();
    if (data.data) {
      setItineraryList(data.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getItineraryList();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main className={styles.pageWrapper}>
          <div className={styles.container}>
            {itineraryList.map((el, index) => (
              <div
                key={index}
                className={styles.itinerary}
                onClick={() => {
                  setTheTop({
                    title: el.title,
                    destinations: el.destinations,
                  });
                  navigate(`${ROUTE_PATHS.itineraryList}/${el.itinerary_id}`);
                }}
              >
                <div className={styles.topWrapper}>
                  <div className={styles.time}>
                    {el.timestamp.slice(0, el.timestamp.indexOf('T'))}
                  </div>
                  <img
                    src={menu}
                    onClick={(event) => {
                      event.stopPropagation();
                      setItinerary(el);
                      setIsMenuModalOpen(true);
                    }}
                  />
                </div>
                <div className={styles.titleWrapper}>
                  <span className={styles.title}>{el.title}</span>
                </div>
                <Destinations destinations={el.destinations} />
              </div>
            ))}
          </div>
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
