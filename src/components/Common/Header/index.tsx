import { AiOutlineMenu } from 'react-icons/ai';
import { ReactNode, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillHome, AiOutlineSchedule, AiFillWechat } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import Button from '../Button';
import styles from './styles.module.scss';

interface HeaderProps {
  children?: ReactNode;
}

export default function Header({ children }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.menuWrapper}>
          <Button
            size="sm"
            icon={<AiOutlineMenu />}
            iconBtn={true}
            onClick={() => setIsOpen(true)}
          />
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
              <li className={styles.profileWrapper}>
                <BsFillPersonFill />
                <div className={styles.name}>닉네임</div>
              </li>
              <li className={styles.nav}>
                <div className={styles.clicked} />
                <AiFillHome /> <div className={styles.title}>홈</div>
              </li>
              <li className={styles.nav}>
                <div className={styles.clicked} />
                <AiFillWechat />
                <div className={styles.title}>AI 플래너</div>
              </li>
              <li className={styles.nav}>
                <div className={styles.clicked} />
                <AiOutlineSchedule />
                <div className={styles.title}>여행일정</div>
              </li>
              <li className={styles.nav}>
                <div className={styles.clicked} />
                <BsFillPersonFill />
                <div className={styles.title}>마이페이지</div>
              </li>
            </ul>
            <div className={styles.signout}>
              <Button icon={<FiLogOut />} full={true}>
                로그아웃
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
