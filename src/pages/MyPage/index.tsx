import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { nameState } from '@/store/atom/signUpAtom';
import { isLoginState, profileImageState } from '@/store/atom/userAtom';
import gildong from '@/assets/gildong_icon.png';
import Header from '@/components/Common/Header';
import { deleteUserAPI } from '@/services/user';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

export default function MyPage() {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoginState);
  const name = useRecoilValue(nameState);
  const profileImage = useRecoilValue(profileImageState);

  const DeleteUserHandler = async () => {
    const data = await deleteUserAPI();
    if (data === 204) {
      setIsLogin(false);
      sessionStorage.clear();
      navigate(ROUTE_PATHS.home);
    }
  };

  return (
    <>
      <Header>마이 페이지</Header>
      <div className={`${styles.pageWrapper} colorLayout`}>
        <div className={styles.profileWrapper}>
          {profileImage !== 'default' ? (
            <img src={profileImage} />
          ) : (
            <img src={gildong} />
          )}
          <div className={styles.name}>{name} 님</div>
        </div>
        <div className={styles.container}>
          <div className={styles.contentWrapper}>
            <div
              className={styles.content}
              onClick={() => navigate(ROUTE_PATHS.updateUserInfo)}
            >
              <BsFillPencilFill />
              회원정보 수정
              <AiOutlineRight />
            </div>
            <div
              className={styles.content}
              onClick={() => {
                setIsLogin(false);
                sessionStorage.clear();
              }}
            >
              <FiLogOut />
              로그아웃
              <AiOutlineRight />
            </div>
          </div>
          <div className={styles.delete}>
            <span onClick={DeleteUserHandler}>회원탈퇴</span>
          </div>
        </div>
      </div>
    </>
  );
}
