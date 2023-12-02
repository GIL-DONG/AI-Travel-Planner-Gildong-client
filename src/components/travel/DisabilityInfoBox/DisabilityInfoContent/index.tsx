import { FaWheelchair } from 'react-icons/fa';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiFillCar, AiOutlineCheck, AiFillSound } from 'react-icons/ai';
import { MdElevator } from 'react-icons/md';
import { FaRestroom, FaDog } from 'react-icons/fa';
import { GrBraille } from 'react-icons/gr';
import { RiGuideFill } from 'react-icons/ri';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { BsFillSignpostSplitFill } from 'react-icons/bs';
import { DisabilityInfoListTypes } from '@/types/travel';
import styles from './styles.module.scss';
import DisabilityInfoContentItem from './DisabilityInfoContentItem';

interface DisabilityInfoProps {
  disabilityInfoList: DisabilityInfoListTypes[];
  currentTab: number;
}

export default function DisabilityInfoContent({
  disabilityInfoList,
  currentTab,
}: DisabilityInfoProps) {
  return (
    <ul className={styles.tabContentContainer}>
      {disabilityInfoList[currentTab].content?.split('#').map((el, index) => {
        if (el.includes('주차')) {
          return (
            <DisabilityInfoContentItem
              icon={<AiFillCar />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('점자')) {
          return (
            <DisabilityInfoContentItem
              icon={<GrBraille />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('휠체어')) {
          return (
            <DisabilityInfoContentItem
              icon={<FaWheelchair />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('엘리베이터')) {
          return (
            <DisabilityInfoContentItem
              icon={<MdElevator />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('화장실')) {
          return (
            <DisabilityInfoContentItem
              icon={<FaRestroom />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('보조견')) {
          return (
            <DisabilityInfoContentItem
              icon={<FaDog />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('음성')) {
          return (
            <DisabilityInfoContentItem
              icon={<AiFillSound />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('안내요원')) {
          return (
            <DisabilityInfoContentItem
              icon={<BsFillPersonFill />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('안내 시스템')) {
          return (
            <DisabilityInfoContentItem
              icon={<RiGuideFill />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('표지')) {
          return (
            <DisabilityInfoContentItem
              icon={<BsFillSignpostSplitFill />}
              title={el}
              key={index}
            />
          );
        } else if (el.includes('비디오')) {
          return (
            <DisabilityInfoContentItem
              icon={<MdOutlineOndemandVideo />}
              title={el}
              key={index}
            />
          );
        } else {
          return (
            <DisabilityInfoContentItem
              icon={<AiOutlineCheck />}
              title={el}
              key={index}
            />
          );
        }
      })}
    </ul>
  );
}
