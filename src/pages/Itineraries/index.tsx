import { useEffect, useState } from 'react';
import { PiWechatLogo } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LiaCalendarCheckSolid } from 'react-icons/lia';
import { MdDeleteForever } from 'react-icons/md';
import Header from '@/components/Common/Header';
import {
  deleteItineraryAPI,
  getAllItineraryAPI,
  getCalendarAPI,
} from '@/services/travel';
import { itineraryTypes } from '@/types/travel';
import Button from '@/components/Common/Button';
import { ROUTE_PATHS } from '@/constants/config';
import Destinations from '@/components/Travel/Destinations';
import { itineraryState, theTopState } from '@/store/atom/travelAtom';
import Modal from '@/components/Common/Modal';
import { kakaoTokenState } from '@/store/atom/userAtom';
import LoadingSpinner from '@/components/Common/LoadingSpinner';
import ModalBottom from '@/components/Common/Modal/Bottom';
import menu from '@/assets/menu.png';
import styles from './styles.module.scss';

export default function Itineraries() {
  const navigate = useNavigate();
  const setTheTop = useSetRecoilState(theTopState);
  const [list, setList] = useState<itineraryTypes[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const kakaoToken = useRecoilValue(kakaoTokenState);
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryId, setItineraryId] = useState('');
  const [isButtonModalOpen, setIsButtonModalOpen] = useState(false);
  const itinerary = useRecoilValue(itineraryState);
  const setItinerary = useSetRecoilState(itineraryState);

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
      <div className={styles.pageWrapper}>
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
                <div className={styles.top}>
                  <div className={styles.time}>
                    {el.timestamp.slice(0, el.timestamp.indexOf('T'))}
                  </div>
                  <img
                    src={menu}
                    onClick={(event) => {
                      event.stopPropagation();
                      setItinerary(el);
                      setIsButtonModalOpen(true);
                    }}
                  />
                </div>
                <div className={styles.titleWrapper}>
                  <div className={styles.title}>{el.title}</div>
                </div>
                <Destinations destinations={el.destinations} />
              </div>
            ))}
            <Modal
              headerText="AI Travel Planner 길동이"
              isModalOpen={isDeleteModalOpen}
              onClickCloseModal={() => {
                setIsDeleteModalOpen(false);
              }}
            >
              <div className={styles.modalContainer}>
                <span>삭제하시겠습니까?</span>
                <div className={styles.deleteButton}>
                  <Button
                    variant="lined"
                    color="secondary"
                    size="lg"
                    onClick={() => {
                      setIsDeleteModalOpen(false);
                    }}
                  >
                    취소
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={async () => {
                      if (itineraryId) {
                        const data = await deleteItineraryAPI(itineraryId);
                        if (data.status === 200) {
                          getAllItinerary();
                          setIsDeleteModalOpen(false);
                        }
                      }
                    }}
                  >
                    확인
                  </Button>
                </div>
              </div>
            </Modal>
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
                    챗봇과의 대화를 통해 <br /> 정확한 여행시작일을 정해주세요!
                  </div>
                ) : (
                  <span>
                    카카오 캘린더에서 저장된 일정을 <br /> 확인하실 수 있습니다.
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
            <ModalBottom
              headerText="AI Travel Planner 길동이"
              isModalOpen={isButtonModalOpen}
              onClickCloseModal={() => {
                setIsButtonModalOpen(false);
              }}
            >
              <div className={styles.button}>
                <div
                  className={styles.btn}
                  onClick={() => {
                    setIsButtonModalOpen(false);
                    if (itinerary.date_type === 'day_label' || !kakaoToken) {
                      setFailed(true);
                      setIsModalOpen(true);
                    } else {
                      sharingHandler(itinerary.itinerary_id);
                    }
                  }}
                >
                  <Button
                    icon={<LiaCalendarCheckSolid />}
                    iconBtn={true}
                    size="sm"
                    color="black"
                  >
                    공유
                  </Button>
                  카카오톡캘린더
                </div>
                <div
                  className={styles.btn}
                  onClick={() => {
                    setIsButtonModalOpen(false);
                    setTheTop({
                      title: itinerary.title,
                      destinations: itinerary.destinations,
                    });
                    navigate(`/chat/itinerary/${itinerary.session_id}`);
                  }}
                >
                  <Button
                    icon={<PiWechatLogo />}
                    iconBtn={true}
                    size="sm"
                    color="primary"
                  >
                    챗봇
                  </Button>
                  여행일정챗봇
                </div>
                <div
                  className={styles.btn}
                  onClick={() => {
                    setIsButtonModalOpen(false);
                    setItineraryId(itinerary.itinerary_id);
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <Button
                    icon={<MdDeleteForever />}
                    iconBtn={true}
                    size="sm"
                    color="delete"
                  >
                    삭제
                  </Button>
                  일정삭제
                </div>
              </div>
            </ModalBottom>
          </div>
        )}
      </div>
    </>
  );
}
