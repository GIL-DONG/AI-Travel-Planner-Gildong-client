import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { PiWechatLogo } from 'react-icons/pi';
import { LiaCalendarCheckSolid } from 'react-icons/lia';
import { FiLogOut } from 'react-icons/fi';
import { GoPerson } from 'react-icons/go';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import {
  isLoginState,
  nameState,
  userProfileImageState,
} from '@/store/atom/userAtom';
import { ROUTE_PATHS } from '@/constants/config';
import {
  mainChatListState,
  pageState,
  sessionIdState,
} from '@/store/atom/chatAtom';
import { headerStatusState } from '@/store/atom/globalAtom';
import Button from '../Button';
import styles from './styles.module.scss';

export default function Header() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const name = useRecoilValue(nameState);
  const profileImage = useRecoilValue(userProfileImageState);
  const isLogin = useRecoilValue(isLoginState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setSessionId = useSetRecoilState(sessionIdState);
  const setMainChatList = useSetRecoilState(mainChatListState);
  const setPage = useSetRecoilState(pageState);
  const headerStatus = useRecoilValue(headerStatusState);

  if (headerStatus.pageName === '' && headerStatus.title === '') {
    return;
  }

  return (
    <>
      <header className={styles.container}>
        <section className={styles.menuWrapper}>
          {headerStatus?.pageName === 'signUp' ||
          headerStatus?.pageName === 'itineraryChat' ||
          headerStatus.pageName === 'travelDetails' ||
          headerStatus?.pageName === 'itineraryDetails' ? (
            <Button
              size="md"
              icon={<AiOutlineLeft />}
              iconBtn={true}
              onClick={() => {
                if (headerStatus?.pageName === 'signUp') {
                  navigate(ROUTE_PATHS.signIn);
                } else if (headerStatus?.pageName === 'itineraryChat') {
                  navigate(ROUTE_PATHS.itineraryList);
                } else {
                  navigate(-1);
                }
              }}
              label="뒤로가기"
            >
              뒤로가기
            </Button>
          ) : (
            <Button
              size="md"
              icon={<AiOutlineMenu />}
              iconBtn={true}
              onClick={() => setIsOpen(true)}
              label="메뉴"
            >
              메뉴
            </Button>
          )}
          <div className={styles.menu}>{headerStatus?.title}</div>
        </section>
      </header>
      {isOpen && (
        <section
          className={styles.navbarWrapper}
          onClick={() => setIsOpen(false)}
        >
          <nav
            className={styles.navbar}
            onClick={(event) => event.stopPropagation()}
          >
            <ul className={styles.content}>
              <li className={styles.buttonWrapper}>
                <Button
                  size="md"
                  icon={<IoMdClose />}
                  iconBtn={true}
                  onClick={() => setIsOpen(false)}
                  label="닫기"
                >
                  닫기
                </Button>
              </li>
              {isLogin ? (
                <li className={styles.profileWrapper}>
                  <div className={styles.profileImage}>
                    {profileImage !== 'default' ? (
                      <img src={profileImage} alt="프로필이미지" />
                    ) : (
                      <IoPersonCircleSharp />
                    )}
                  </div>
                  <div className={styles.nameWrapper}>
                    <span className={styles.name}>{name}</span>
                  </div>
                </li>
              ) : (
                <li
                  className={styles.login}
                  onClick={() => {
                    setIsOpen(false);
                    navigate(ROUTE_PATHS.signIn);
                  }}
                >
                  로그인 및 회원가입
                </li>
              )}
              <li
                className={styles.nav}
                onClick={() => {
                  setPage(ROUTE_PATHS.home);
                  setIsOpen(false);
                  setMainChatList([]);
                  setSessionId('');
                  navigate(ROUTE_PATHS.home);
                }}
              >
                <div className={styles.clicked} />
                <AiOutlineHome /> <div className={styles.title}>홈</div>
              </li>
              <li
                className={styles.nav}
                onClick={() => {
                  setPage(ROUTE_PATHS.mainChat);
                  setIsOpen(false);
                  navigate(ROUTE_PATHS.mainChat);
                }}
              >
                <div className={styles.clicked} />
                <PiWechatLogo />
                <div className={styles.title}>AI플래너</div>
              </li>
              <li
                className={styles.nav}
                onClick={() => {
                  setPage(ROUTE_PATHS.itineraryList);
                  setIsOpen(false);
                  navigate(ROUTE_PATHS.itineraryList);
                }}
              >
                <div className={styles.clicked} />
                <LiaCalendarCheckSolid />
                <div className={styles.title}>여행일정</div>
              </li>
              <li
                className={styles.nav}
                onClick={() => {
                  setPage(ROUTE_PATHS.myPage);
                  setIsOpen(false);
                  navigate(ROUTE_PATHS.myPage);
                }}
              >
                <div className={styles.clicked} />
                <GoPerson />
                <div className={styles.title}>마이페이지</div>
              </li>
            </ul>
            {isLogin && (
              <div className={styles.signout}>
                <Button
                  icon={<FiLogOut />}
                  full={true}
                  onClick={() => {
                    setIsLogin(false);
                    localStorage.clear();
                    sessionStorage.clear();
                    setIsOpen(false);
                  }}
                  label="로그아웃"
                >
                  로그아웃
                </Button>
              </div>
            )}
          </nav>
        </section>
      )}
    </>
  );
}
