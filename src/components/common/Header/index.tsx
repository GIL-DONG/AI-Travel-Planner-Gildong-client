import { AiOutlineMenu } from 'react-icons/ai';
import { ReactNode, useState } from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { PiWechatLogo } from 'react-icons/pi';
import { LiaCalendarCheckSolid } from 'react-icons/lia';
import { FiLogOut } from 'react-icons/fi';
import { GoPerson } from 'react-icons/go';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AiOutlineArrowRight, AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { nameState } from '@/store/atom/signUpAtom';
import { isLoginState, userProfileImageState } from '@/store/atom/userAtom';
import gildong from '@/assets/gildong_icon.png';
import { ROUTE_PATHS } from '@/constants/config';
import {
  mainChatListState,
  pageState,
  sessionIdState,
} from '@/store/atom/chatAtom';
import Button from '../Button';
import styles from './styles.module.scss';

interface HeaderProps {
  back?: boolean;
  page?: string;
  children?: ReactNode;
}

export default function Header({ back, page, children }: HeaderProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const name = useRecoilValue(nameState);
  const profileImage = useRecoilValue(userProfileImageState);
  const isLogin = useRecoilValue(isLoginState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setSessionId = useSetRecoilState(sessionIdState);
  const setMainChatList = useSetRecoilState(mainChatListState);
  const setPage = useSetRecoilState(pageState);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.menuWrapper}>
          {back ? (
            <Button
              size="md"
              icon={<AiOutlineLeft />}
              iconBtn={true}
              onClick={() => {
                if (page === 'signUp') {
                  navigate(ROUTE_PATHS.signIn);
                } else if (page === 'itineraryChat') {
                  navigate(ROUTE_PATHS.itineraryList);
                } else {
                  navigate(-1);
                }
              }}
            />
          ) : (
            <Button
              size="md"
              icon={<AiOutlineMenu />}
              iconBtn={true}
              onClick={() => setIsOpen(true)}
            />
          )}
          <div className={styles.menu}>{children}</div>
        </div>
      </div>
      {isOpen ? (
        <div className={styles.navbarWrapper} onClick={() => setIsOpen(false)}>
          <div
            className={styles.navbar}
            onClick={(event) => event.stopPropagation()}
          >
            <ul className={styles.content}>
              {isLogin ? (
                <li className={styles.profileWrapper}>
                  <div className={styles.profileImage}>
                    {profileImage !== 'default' ? (
                      <img src={profileImage} />
                    ) : (
                      <img src={gildong} />
                    )}
                  </div>
                  <div className={styles.name}>
                    <strong>{name}</strong> 님
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
                  로그인 및 회원가입 <AiOutlineArrowRight />
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
                <div className={styles.title}>AI 플래너</div>
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
            {isLogin ? (
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
                >
                  로그아웃
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
