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
        일정 추가
      </Button>
      <Modal
        headerText="AI Travel Planner 길동이"
        isModalOpen={isModalOpen}
        onClickCloseModal={onClickCloseModal}
      >
        <div className={styles.container}>
          {isLogin
            ? '일정을 추가하시겠습니까?'
            : `로그인이 필요합니다. 로그인하시겠습니까?`}
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
