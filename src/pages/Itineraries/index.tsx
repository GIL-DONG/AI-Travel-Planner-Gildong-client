import { useEffect, useState } from 'react';
import { PiWechatLogo } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LiaCalendarCheckSolid } from 'react-icons/lia';
import Header from '@/components/Common/Header';
import { getAllItineraryAPI, getCalendarAPI } from '@/services/travel';
import { itineraryTypes } from '@/types/travel';
import Button from '@/components/Common/Button';
import { ROUTE_PATHS } from '@/constants/config';
import Destinations from '@/components/Travel/Destinations';
import { theTopState } from '@/store/atom/travelAtom';
import Modal from '@/components/Common/Modal';
import { kakaoTokenState } from '@/store/atom/userAtom';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import styles from './styles.module.scss';

export default function Itineraries() {
  const navigate = useNavigate();
  const setTheTop = useSetRecoilState(theTopState);
  const [list, setList] = useState<itineraryTypes[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const kakaoToken = useRecoilValue(kakaoTokenState);
  const [isLoading, setIsLoading] = useState(false);

  const onClickCloseModal = () => {
    setIsModalOpen(false);
  };

  const getAllItinerary = async () => {
    setIsLoading(true);
    const data = await getAllItineraryAPI();
    if (data.data) {
      setList(data.data);
      setIsLoading(false);
    }
  };

  const sharingHandler = async (id: string) => {
    const token = kakaoToken;
    if (token) {
      const data = await getCalendarAPI(id, token);
      if (data.message === 'successful') {
        setFailed(false);
        setIsModalOpen(true);
      }
    }
  };

  useEffect(() => {
    getAllItinerary();
  }, []);
  return (
    <>
      <Header>여행 일정</Header>
      <div className={`${styles.pageWrapper} colorLayout`}>
        {isLoading ? (
          <div className={styles.loading}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={styles.container}>
            {list.map((el, index) => (
              <div
                key={index}
                className={styles.wrapper}
                onClick={() => {
                  navigate(`${ROUTE_PATHS.itinerary}/${el.itinerary_id}`);
                }}
              >
                <div className={styles.time}>
                  {el.timestamp.slice(0, el.timestamp.indexOf('T'))}
                </div>
                <div className={styles.titleWrapper}>
                  <div className={styles.title}>{el.title}</div>
                  <div className={styles.button}>
                    <Button
                      icon={<LiaCalendarCheckSolid />}
                      iconBtn={true}
                      size="md"
                      color="black"
                      onClick={(event) => {
                        event.stopPropagation();
                        if (el.date_type === 'day_label' || !kakaoToken) {
                          setFailed(true);
                          setIsModalOpen(true);
                        } else {
                          sharingHandler(el.itinerary_id);
                        }
                      }}
                    >
                      공유
                    </Button>
                    <Button
                      icon={<PiWechatLogo />}
                      iconBtn={true}
                      size="md"
                      color="primary"
                      onClick={(event) => {
                        event.stopPropagation();
                        setTheTop({
                          title: el.title,
                          destinations: el.destinations,
                        });
                        navigate(`/chat/itinerary/${el.session_id}`);
                      }}
                    >
                      챗봇
                    </Button>
                  </div>
                </div>
                <Destinations destinations={el.destinations} />
              </div>
            ))}
            {isModalOpen ? (
              <Modal
                headerText="AI Travel Planner 길동이"
                isModalOpen={isModalOpen}
                onClickCloseModal={onClickCloseModal}
              >
                <div className={styles.modalContainer}>
                  {!kakaoToken ? (
                    <span>
                      test용 ID로 로그인시 카카오 캘린더를 이용하실 수 없습니다.
                    </span>
                  ) : failed ? (
                    <div className={styles.modalContent}>
                      챗봇과의 대화를 통해 <br /> 정확한 여행시작일을
                      정해주세요!
                    </div>
                  ) : (
                    <span>
                      카카오 캘린더에서 저장된 일정을 <br /> 확인하실 수
                      있습니다.
                    </span>
                  )}
                  <div className={styles.modalButton}>
                    <Button
                      variant="secondary"
                      size="lg"
                      onClick={onClickCloseModal}
                    >
                      확인
                    </Button>
                  </div>
                </div>
              </Modal>
            ) : null}
          </div>
        )}
      </div>
    </>
  );
}
