import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheck } from 'react-icons/ai';
import { BiSolidPlane } from 'react-icons/bi';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import { isLoginState } from '@/store/atom/userAtom';
import {
  getRegisterItineraryAPI,
  getItineraryDetailsAPI,
} from '@/services/travel';
import {
  itineraryIdState,
  mainChatListState,
  sessionIdState,
} from '@/store/atom/chatAtom';
import { ItineraryScheduleTypes } from '@/types/travel';
import { theTopState } from '@/store/atom/travelAtom';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

interface AddItineraryButtonProps {
  id: string;
}

export default function RegisterItineraryButton({
  id,
}: AddItineraryButtonProps) {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sessionId = useRecoilValue(sessionIdState);
  const setSessionId = useSetRecoilState(sessionIdState);
  const setTheTop = useSetRecoilState(theTopState);
  const setItineraryId = useSetRecoilState(itineraryIdState);
  const setMainChatList = useSetRecoilState(mainChatListState);

  const onClickOpenModal = () => {
    setIsModalOpen(true);
  };

  const onClickCloseModal = () => {
    setIsModalOpen(false);
  };

  const confirmHandler = async () => {
    const data = await getRegisterItineraryAPI(id);
    if (data.message === 'Itinerary registered successfully.') {
      const res = await getItineraryDetailsAPI(id);
      if (res) {
        setTheTop({
          title: res.data?.title,
          destinations: res.data?.schedule.map((el: ItineraryScheduleTypes) => {
            return { title: el.title };
          }),
        });
        setItineraryId('');
        setSessionId('');
        setMainChatList([]);
        navigate(`/chat/itinerary/${sessionId}`);
      }
    }
  };

  return (
    <>
      <Button
        variant="primary"
        icon={<AiOutlinePlus />}
        onClick={onClickOpenModal}
      >
        일정 등록
      </Button>
      <Modal
        headerText="AI Travel Planner 길동이"
        isModalOpen={isModalOpen}
        onClickCloseModal={onClickCloseModal}
      >
        <div className={styles.container}>
          {isLogin ? (
            <div>
              일정을 등록하고 <strong>'여행 일정 챗봇'</strong>에서 더욱 다양한
              기능으로 함께 즐거운 여행을 만들어봐요! <BiSolidPlane /> <br />
              <br />
              <div className={styles.margin}>
                <AiOutlineCheck /> 여행지의 <strong>실시간 날씨</strong>가
                궁금하다구요? 바로 알려드릴게요!
              </div>
              <div className={styles.margin}>
                <AiOutlineCheck /> 다른 <strong>여행자들의 후기</strong>를
                찾아보고 싶다면? 내가 도와줄게요!
              </div>
              <div className={styles.margin}>
                <AiOutlineCheck /> 일정에 <strong>변동</strong>이 생겼다면?
                언제든지 <strong>수정</strong>
                도와드릴게요!
              </div>
              <br />
              <div className={styles.center}>
                일정을&nbsp;<strong>등록</strong>하시겠습니까?
              </div>
            </div>
          ) : (
            <div>
              회원이 되면 <strong>'길동이'</strong>와 함께 더 다양한 모험을 즐길
              수 있답니다! <BiSolidPlane />
              <br />
              <br />
              <div className={styles.margin}>
                <AiOutlineCheck /> 여행지의 <strong>실시간 날씨</strong>? 바로
                알려드려요!
              </div>
              <div className={styles.margin}>
                <AiOutlineCheck /> 궁금한 <strong>여행지 후기?</strong> 내가
                찾아줄게요!
              </div>
              <div className={styles.margin}>
                <AiOutlineCheck /> <strong>일정 수정</strong>이 필요하다구요?
                언제든지 도와드릴게요!
              </div>
              <br />
              <div className={styles.center}>
                <strong>로그인</strong>&nbsp; 또는&nbsp;
                <strong>회원가입</strong>을 하시겠습니까?
              </div>
            </div>
          )}
          <div className={styles.button}>
            <Button
              variant="lined"
              color="secondary"
              size="lg"
              onClick={onClickCloseModal}
            >
              취소
            </Button>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                if (isLogin) {
                  confirmHandler();
                } else {
                  navigate(ROUTE_PATHS.signIn);
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
