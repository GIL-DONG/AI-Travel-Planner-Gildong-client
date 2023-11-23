import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AiOutlineRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { useState } from 'react';
import { PiWarningCircleFill } from 'react-icons/pi';
import { Helmet } from 'react-helmet-async';
import { isLoginState, userProfileImageState } from '@/store/atom/userAtom';
import { deleteUserAPI } from '@/services/user';
import { ROUTE_PATHS } from '@/constants/config';
import { nameState } from '@/store/atom/signUpAtom';
import useStatus from '@/hooks/useStatus';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import modify from '@/assets/modify.png';
import logout from '@/assets/logout.png';
import styles from './styles.module.scss';

export default function MyPage() {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoginState);
  const name = useRecoilValue(nameState);
  const profileImage = useRecoilValue(userProfileImageState);
  const [isOpenModal, setIsOpenModal] = useState(false);
  useStatus('myPage', '마이페이지');

  const DeleteUserHandler = async () => {
    const data = await deleteUserAPI();
    if (data.status === 204) {
      setIsLogin(false);
      localStorage.clear();
      sessionStorage.clear();
      navigate(ROUTE_PATHS.home);
    }
    setIsOpenModal(false);
  };

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>My Page</title>
      </Helmet>
      <div className={styles.profileWrapper}>
        {profileImage !== 'default' ? (
          <img src={profileImage} alt="프로필이미지" />
        ) : (
          <IoPersonCircleSharp />
        )}
        <div className={styles.name}>
          <strong>{name}</strong>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <div
            className={styles.content}
            onClick={() => navigate(ROUTE_PATHS.modifyUserInfo)}
          >
            <span>
              <img src={modify} alt="회원정보수정버튼이미지" />
              <strong>회원정보수정</strong>
            </span>
            <AiOutlineRight />
          </div>
          <div
            className={styles.content}
            onClick={() => {
              setIsLogin(false);
              localStorage.clear();
              sessionStorage.clear();
            }}
          >
            <span>
              <img src={logout} alt="로그아웃이미지" />
              <strong>로그아웃</strong>
            </span>
            <AiOutlineRight />
          </div>
        </div>
        <div className={styles.delete}>
          <span onClick={() => setIsOpenModal(true)}>회원탈퇴</span>
        </div>
        <Modal
          isModalOpen={isOpenModal}
          onClickCloseModal={() => setIsOpenModal(false)}
        >
          <div className={styles.modalContainer}>
            <PiWarningCircleFill />
            <span className={styles.text}>정말 탈퇴하시겠습니까?</span>
            <div className={styles.confirmWrapper}>
              <Button
                variant="disabled"
                size="lg"
                onClick={() => {
                  setIsOpenModal(false);
                }}
                label="취소"
              >
                취소
              </Button>
              <Button
                variant="primary"
                size="lg"
                onClick={DeleteUserHandler}
                label="확인"
              >
                확인
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
