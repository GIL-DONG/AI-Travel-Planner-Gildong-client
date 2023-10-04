import { TbBeach } from 'react-icons/tb';
import { FaWheelchair } from 'react-icons/fa';
import { FaBlind } from 'react-icons/fa';
import { ImFire } from 'react-icons/im';
import Header from '@/components/Common/Header';
import gildong from '@/assets/gildong_3d.png';
import styles from './styles.module.scss';
export default function Home() {
  return (
    <>
      <Header />
      <div className={`${styles.pageWrapper} colorLayout`}>
        <div className={styles.content}>
          <div className={styles.title}>길동이에게 여행 일정을 맡겨보세요!</div>
          <img src={gildong} className={styles.img} />
          <div className={styles.exampleWrapper}>
            <div className={styles.example}>
              <TbBeach />
              <span className={styles.text}>
                어디든 바다가 있는 곳으로 떠나고 싶어
              </span>
            </div>
            <div className={styles.example}>
              <FaWheelchair />
              <span className={styles.text}>
                휠체어로 갈 수 있는 3박 4일 부산여행 일정을 추천해줘!
              </span>
            </div>
            <div className={styles.example}>
              <FaBlind />
              <span className={styles.text}>
                시각장애인도 갈 수 있는 2박 3일 통영여행 일정을 추천해줘
              </span>
            </div>
            <div className={styles.example}>
              <ImFire />
              <span className={styles.text}>
                요즘 사람들이 많이 가는 여행지로 추천해줘
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
