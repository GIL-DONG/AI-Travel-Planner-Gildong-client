import React, { SetStateAction, useState } from 'react';
import { PiWechatLogo } from 'react-icons/pi';
import { MdDeleteForever } from 'react-icons/md';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { LiaCalendarCheckSolid } from 'react-icons/lia';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { PiWarningCircleFill } from 'react-icons/pi';
import { useMutation, useQueryClient } from 'react-query';
import ModalBottom from '@/components/common/Modal/Bottom';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { deleteItineraryAPI, getKaKaoCalendarAPI } from '@/services/travel';
import { kakaoTokenState } from '@/store/atom/userAtom';
import { itineraryState, theTopState } from '@/store/atom/travelAtom';
import styles from './styles.module.scss';

interface ItineraryMenuBoxProps {
  isManuModalOpen: boolean;
  setIsMenuModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function ItineraryMenuBox({
  isManuModalOpen,
  setIsMenuModalOpen,
}: ItineraryMenuBoxProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const kakaoToken = useRecoilValue(kakaoTokenState);
  const itinerary = useRecoilValue(itineraryState);
  const setTheTop = useSetRecoilState(theTopState);
  const [isOpenKakaoCalendarModal, setIsOpenKakaoCalendarModal] =
    useState(false);
  const [isOpenDeleteItineraryModal, setIsOpenDeleteItineraryModal] =
    useState(false);
  const [isFailedKakaoCalendar, setIsFailedKakaoCalendar] = useState(false);

  interface getKaKaoCalendarProps {
    id: string;
    token: string;
  }

  const deleteItinerary = async (itineraryId: string) => {
    const response = await deleteItineraryAPI(itineraryId);
    return response;
  };

  const getKaKaoCalendar = async ({ id, token }: getKaKaoCalendarProps) => {
    const response = await getKaKaoCalendarAPI(id, token);
    return response;
  };

  const deleteMutation = useMutation(deleteItinerary, {
    onSuccess: () => {
      queryClient.invalidateQueries('itineraryList');
    },
    onSettled: () => {
      setIsOpenDeleteItineraryModal(false);
    },
  });
  const postMutation = useMutation(getKaKaoCalendar, {
    onSuccess: () => {
      setIsFailedKakaoCalendar(false);
      setIsOpenKakaoCalendarModal(true);
    },
  });

  const registerKakaoCalendar = async (id: string) => {
    const token = kakaoToken;
    if (token) {
      postMutation.mutate({ id, token });
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

  const deleteConfirmHandler = () => {
    if (itinerary?.itinerary_id) {
      deleteMutation.mutate(itinerary?.itinerary_id);
    }
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
              label="카카오톡캘린더"
            >
              카카오톡캘린더
            </Button>
            카카오톡캘린더
          </div>
          <div className={styles.buttonWrapper} onClick={chatHandler}>
            <Button
              icon={<PiWechatLogo />}
              iconBtn={true}
              size="sm"
              color="primary"
              label="여행일정챗봇"
            >
              여행일정챗봇
            </Button>
            여행일정챗봇
          </div>
          <div className={styles.buttonWrapper} onClick={deleteHandler}>
            <Button
              icon={<MdDeleteForever />}
              iconBtn={true}
              size="sm"
              color="delete"
              label="일정삭제"
            >
              일정삭제
            </Button>
            일정삭제
          </div>
        </div>
      </ModalBottom>
      <Modal
        isModalOpen={isOpenKakaoCalendarModal}
        onClickCloseModal={() => setIsOpenKakaoCalendarModal(false)}
      >
        <div className={styles.modalContainer}>
          {!kakaoToken ? (
            <>
              <PiWarningCircleFill />
              <div className={styles.text}>
                <span>카카오 캘린더를 이용하실 수 없습니다.</span>
              </div>
            </>
          ) : isFailedKakaoCalendar ? (
            <>
              <PiWarningCircleFill />
              <div className={styles.text}>
                <span>챗봇과의 대화를 통해</span>
                <span>
                  정확한 <strong>여행시작일</strong>을 정해주세요!
                </span>
              </div>
            </>
          ) : (
            <>
              <FaCheckCircle />
              <span className={styles.text}>
                <span>
                  <strong>카카오 캘린더</strong>에서 저장된 일정을
                </span>
                <span>확인하실 수 있습니다.</span>
              </span>
            </>
          )}
          <div className={styles.checkWrapper}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => setIsOpenKakaoCalendarModal(false)}
              label="확인"
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        isModalOpen={isOpenDeleteItineraryModal}
        onClickCloseModal={() => {
          setIsOpenDeleteItineraryModal(false);
        }}
      >
        <div className={styles.modalContainer}>
          <MdDeleteForever />
          <span className={styles.text}>일정을 삭제하시겠습니까?</span>
          <div className={styles.confirmWrapper}>
            <Button
              variant="disabled"
              size="lg"
              onClick={() => {
                setIsOpenDeleteItineraryModal(false);
              }}
              label="취소"
            >
              취소
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={deleteConfirmHandler}
              label="확인"
            >
              확인
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
