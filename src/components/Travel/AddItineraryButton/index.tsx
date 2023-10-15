import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Common/Button';
import Modal from '@/components/Common/Modal';
import { isLoginState } from '@/store/atom/userAtom';
import { getAddItineraryAPI } from '@/services/travel';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

interface AddItineraryButtonProps {
  id: string;
}

export default function AddItineraryButton({ id }: AddItineraryButtonProps) {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginState);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onClickOpenModal = () => {
    setIsModalOpen(true);
    sessionStorage.removeItem('session_id');
  };

  const onClickCloseModal = () => {
    setIsModalOpen(false);
  };

  const confirmHandler = async () => {
    const data = await getAddItineraryAPI(id);
    sessionStorage.setItem('session_id', '');
    if (data) {
      navigate(ROUTE_PATHS.itinerary);
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
            <span>
              일정을 등록하고 '여행 일정 챗봇'에서 더욱 다양한 기능으로 함께
              즐거운 여행을 만들어봐요! ✈ <br />
              ❤ 여행지의 실시간 날씨가 궁금하다구요? 바로 알려드릴게요! <br />
              ❤ 다른 여행자들의 후기를 찾아보고 싶다면? 내가 도와줄게요! <br />
              ❤ 일정에 변동이 생겼다면? 언제든지 수정 도와드릴게요! <br />
              <br />
              일정을 등록하시겠습니까?
            </span>
          ) : (
            <span>
              회원이 되면 '길동이'와 함께 더 다양한 모험을 즐길 수 있답니다! ✈
              <br />
              ❤ 여행지의 실시간 날씨? 바로 알려드려요!
              <br />
              ❤ 궁금한 여행지 후기? 내가 찾아줄게요!
              <br />
              ❤ 일정 수정이 필요하다구요? 언제든지 도와드릴게요!
              <br />
              <br />
              로그인 또는 회원가입을 하시겠습니까?
            </span>
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
                  navigate('/signin');
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
