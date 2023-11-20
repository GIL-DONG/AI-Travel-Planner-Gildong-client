import React, { SetStateAction, useState } from 'react';
import { PiWechatLogo } from 'react-icons/pi';
import { MdDeleteForever } from 'react-icons/md';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LiaCalendarCheckSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import ModalBottom from '@/components/common/Modal/Bottom';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { deleteItineraryAPI, getKaKaoCalendarAPI } from '@/services/travel';
import { kakaoTokenState } from '@/store/atom/userAtom';
import { itineraryState, theTopState } from '@/store/atom/travelAtom';
import { ItineraryTypes } from '@/types/travel';
import styles from './styles.module.scss';

interface ItineraryMenuBoxProps {
  isManuModalOpen: boolean;
  setItineraryList: React.Dispatch<SetStateAction<ItineraryTypes[]>>;
  setIsMenuModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function ItineraryMenuBox({
  isManuModalOpen,
  setItineraryList,
  setIsMenuModalOpen,
}: ItineraryMenuBoxProps) {
  const navigate = useNavigate();
  const kakaoToken = useRecoilValue(kakaoTokenState);
  const itinerary = useRecoilValue(itineraryState);
  const setTheTop = useSetRecoilState(theTopState);
  const [isOpenKakaoCalendarModal, setIsOpenKakaoCalendarModal] =
    useState(false);
  const [isOpenDeleteItineraryModal, setIsOpenDeleteItineraryModal] =
    useState(false);
  const [isFailedKakaoCalendar, setIsFailedKakaoCalendar] = useState(false);

  const registerKakaoCalendar = async (id: string) => {
    const token = kakaoToken;
    if (token) {
      const data = await getKaKaoCalendarAPI(id, token);
      if (data.message === 'successful') {
        setIsFailedKakaoCalendar(false);
        setIsOpenKakaoCalendarModal(true);
      }
    }
  };

  const kakaoCalendarHandler = () => {
    setIsMenuModalOpen(false);
    if (itinerary.date_type === 'day_label' || !kakaoToken) {
      setIsFailedKakaoCalendar(true);
      setIsOpenKakaoCalendarModal(true);
    } else {
      registerKakaoCalendar(itinerary.itinerary_id);
    }
  };

  const chatHandler = () => {
    setIsMenuModalOpen(false);
    setTheTop({
      title: itinerary.title,
      destinations: itinerary.destinations,
    });
    navigate(`/chat/itinerary/${itinerary.session_id}`);
  };

  const deleteHandler = () => {
    setIsMenuModalOpen(false);
    setIsOpenDeleteItineraryModal(true);
  };

  return (
    <>
      <ModalBottom
        isModalOpen={isManuModalOpen}
        onClickCloseModal={() => {
          setIsMenuModalOpen(false);
        }}
      >
        <div className={styles.menuContainer}>
          <div className={styles.buttonWrapper} onClick={kakaoCalendarHandler}>
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
          <div className={styles.buttonWrapper} onClick={chatHandler}>
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
          <div className={styles.buttonWrapper} onClick={deleteHandler}>
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
      <Modal
        headerText="AI Travel Planner 길동이"
        isModalOpen={isOpenKakaoCalendarModal}
        onClickCloseModal={() => setIsOpenKakaoCalendarModal(false)}
      >
        <div className={styles.modalContainer}>
          {!kakaoToken ? (
            <span>
              test용 ID로 로그인시 카카오 캘린더를 이용하실 수 없습니다.
            </span>
          ) : isFailedKakaoCalendar ? (
            <div className={styles.modalContent}>
              챗봇과의 대화를 통해 <br /> 정확한 여행시작일을 정해주세요!
            </div>
          ) : (
            <span>
              카카오 캘린더에서 저장된 일정을 <br /> 확인하실 수 있습니다.
            </span>
          )}
          <div className={styles.checkWrapper}>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setIsOpenKakaoCalendarModal(false)}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        headerText="AI Travel Planner 길동이"
        isModalOpen={isOpenDeleteItineraryModal}
        onClickCloseModal={() => {
          setIsOpenDeleteItineraryModal(false);
        }}
      >
        <div className={styles.modalContainer}>
          <span>삭제하시겠습니까?</span>
          <div className={styles.confirmWrapper}>
            <Button
              variant="lined"
              color="secondary"
              size="lg"
              onClick={() => {
                setIsOpenDeleteItineraryModal(false);
              }}
            >
              취소
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={async () => {
                if (itinerary) {
                  const data = await deleteItineraryAPI(itinerary.itinerary_id);
                  if (data.status === 200) {
                    setItineraryList((preItineraryList) =>
                      preItineraryList.filter(
                        (item) => item.itinerary_id !== itinerary.itinerary_id,
                      ),
                    );
                    setIsOpenDeleteItineraryModal(false);
                  }
                }
              }}
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
