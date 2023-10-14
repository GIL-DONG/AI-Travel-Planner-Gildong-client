import { useEffect, useState } from 'react';
import { BiBot } from 'react-icons/bi';
import { GoShare } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import Header from '@/components/Common/Header';
import { getAllItineraryAPI, getCalendarAPI } from '@/services/travel';
import { itineraryTypes } from '@/types/travel';
import Button from '@/components/Common/Button';
import { ROUTE_PATHS } from '@/constants/config';
import Destinations from '@/components/Travel/Destinations';
import { itineraryState } from '@/store/atom/travelAtom';
import styles from './styles.module.scss';

export default function Itineraries() {
  const navigate = useNavigate();
  const setItinerary = useSetRecoilState(itineraryState);
  const [list, setList] = useState<itineraryTypes[]>([]);

  const getAllItinerary = async () => {
    const data = await getAllItineraryAPI();
    if (data.data) {
      setList(data.data);
    }
  };

  const sharingHandler = async (id: string) => {
    const token = sessionStorage.getItem('kakao_token') + '' || '';
    const data = await getCalendarAPI(id, token);
    console.log(data);
  };

  useEffect(() => {
    getAllItinerary();
  }, []);
  return (
    <>
      <Header>여행 일정</Header>
      <div className={`${styles.pageWrapper} colorLayout`}>
        <div className={styles.container}>
          {list.map((el, index) => (
            <div
              key={index}
              className={styles.wrapper}
              onClick={() => {
                setItinerary(el);
                navigate(`${ROUTE_PATHS.itinerary}/${el.itinerary_id}`);
              }}
            >
              <div className={styles.title}>
                {el.title}
                <div className={styles.button}>
                  <Button
                    icon={<GoShare />}
                    iconBtn={true}
                    size="md"
                    color="secondary"
                    onClick={() => sharingHandler(el.itinerary_id)}
                  >
                    공유
                  </Button>
                  <Button
                    icon={<BiBot />}
                    iconBtn={true}
                    size="md"
                    color="primary"
                  >
                    챗봇
                  </Button>
                </div>
              </div>
              <div onClick={(event) => event.stopPropagation()}>
                <Destinations destinations={el.destinations} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
