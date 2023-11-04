import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsFillPencilFill } from 'react-icons/bs';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { isLoginState, userProfileImageState } from '@/store/atom/userAtom';
import gildong from '@/assets/gildong_icon.png';
import Header from '@/components/Common/Header';
import { deleteUserAPI } from '@/services/user';
import { ROUTE_PATHS } from '@/constants/config';
import { nameState } from '@/store/atom/signUpAtom';
import styles from './styles.module.scss';

export default function MyPage() {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLoginState);
  const name = useRecoilValue(nameState);
  const profileImage = useRecoilValue(userProfileImageState);

  const DeleteUserHandler = async () => {
    if (!confirm('정말 탈퇴하시겠습니까?')) {
      return;
    }
    const data = await deleteUserAPI();
    if (data.status === 204) {
      setIsLogin(false);
      localStorage.clear();
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
          <div className={styles.name}>
            <strong>{name}</strong> 님
          </div>
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
                localStorage.clear();
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
