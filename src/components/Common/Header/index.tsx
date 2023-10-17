import { AiOutlineMenu } from 'react-icons/ai';
import { ReactNode, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillHome, AiOutlineSchedule, AiFillWechat } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AiOutlineArrowRight, AiOutlineLeft } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { nameState } from '@/store/atom/signUpAtom';
import { isLoginState, profileImageState } from '@/store/atom/userAtom';
import gildong from '@/assets/gildong_icon.png';
import { ROUTE_PATHS } from '@/constants/config';
import Button from '../Button';
import styles from './styles.module.scss';

interface HeaderProps {
  back?: boolean;
  color?: 'bg' | 'wh';
  signUp?: boolean;
  children?: ReactNode;
}

interface ColorTypes {
  bg: string;
  wh: string;
}

const COLORS: ColorTypes = {
  bg: styles.bg,
  wh: styles.wh,
};

export default function Header({
  back,
  color = 'bg',
  signUp,
  children,
}: HeaderProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const name = useRecoilValue(nameState);
  const profileImage = useRecoilValue(profileImageState);
  const isLogin = useRecoilValue(isLoginState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const classNameValues = classNames(
    styles.menuWrapper,
    COLORS[color as keyof ColorTypes],
  );

  return (
    <>
      <div className={styles.container}>
        <div className={classNameValues}>
          {back ? (
            <Button
              size="md"
              icon={<AiOutlineLeft />}
              iconBtn={true}
              onClick={() => {
                if (signUp) {
                  navigate('/signin');
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
                  <div className={styles.name}>{name} 님</div>
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
                  setIsOpen(false);
                  navigate(ROUTE_PATHS.home);
                }}
              >
                <div className={styles.clicked} />
                <AiFillHome /> <div className={styles.title}>홈</div>
              </li>
              <li
                className={styles.nav}
                onClick={() => {
                  setIsOpen(false);
                  navigate(ROUTE_PATHS.chat);
                }}
              >
                <div className={styles.clicked} />
                <AiFillWechat />
                <div className={styles.title}>AI 플래너</div>
              </li>
              <li
                className={styles.nav}
                onClick={() => {
                  setIsOpen(false);
                  navigate(ROUTE_PATHS.itinerary);
                }}
              >
                <div className={styles.clicked} />
                <AiOutlineSchedule />
                <div className={styles.title}>여행일정</div>
              </li>
              <li
                className={styles.nav}
                onClick={() => {
                  setIsOpen(false);
                  navigate(ROUTE_PATHS.myPage);
                }}
              >
                <div className={styles.clicked} />
                <BsFillPersonFill />
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
