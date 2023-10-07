import { TbBeach } from 'react-icons/tb';
import { FaWheelchair } from 'react-icons/fa';
import { FaBlind } from 'react-icons/fa';
import { ImFire } from 'react-icons/im';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbSend } from 'react-icons/tb';
import { AiOutlineArrowRight } from 'react-icons/ai';
import Header from '@/components/Common/Header';
import gildong from '@/assets/gildong_3d.png';
import Button from '@/components/Common/Button';
import styles from './styles.module.scss';

export default function Home() {
  return (
    <>
      <Header>AI Travel Planner 길동이</Header>
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
              <div className={styles.go}>
                <AiOutlineArrowRight />
              </div>
            </div>
            <div className={styles.example}>
              <FaWheelchair />
              <span className={styles.text}>
                휠체어로 갈 수 있는 3박 4일 부산여행 일정을 추천해줘!
              </span>
              <div className={styles.go}>
                <AiOutlineArrowRight />
              </div>
            </div>
            <div className={styles.example}>
              <FaBlind />
              <span className={styles.text}>
                시각장애인도 갈 수 있는 2박 3일 통영여행 일정을 추천해줘
              </span>
              <div className={styles.go}>
                <AiOutlineArrowRight />
              </div>
            </div>
            <div className={styles.example}>
              <ImFire />
              <span className={styles.text}>
                요즘 사람들이 많이 가는 여행지로 추천해줘
              </span>
              <div className={styles.go}>
                <AiOutlineArrowRight />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chat}>
          <div className={styles.icon}>
            <Button
              size="sm"
              variant="default"
              color="secondary"
              icon={<AiOutlinePlus />}
              iconBtn={true}
            />
          </div>
          <input className={styles.input} placeholder="무엇이든 물어보세요!" />
          <div className={styles.send}>
            <Button
              size="sm"
              color="white"
              icon={<TbSend />}
              iconBtn={true}
              variant="primary"
            />
          </div>
        </div>
      </div>
    </>
  );
}
