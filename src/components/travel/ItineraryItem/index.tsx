import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import React, { SetStateAction } from 'react';
import menu from '@/assets/menu.webp';
import { ROUTE_PATHS } from '@/constants/config';
import { itineraryState, theTopState } from '@/store/atom/travelAtom';
import { ItineraryTypes } from '@/types/travel';
import Destinations from '../Destinations';
import styles from './styles.module.scss';

interface ItineraryItemProps {
  item: ItineraryTypes;
  setIsMenuModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function ItineraryItem({
  item,
  setIsMenuModalOpen,
}: ItineraryItemProps) {
  const navigate = useNavigate();
  const setTheTop = useSetRecoilState(theTopState);
  const setItinerary = useSetRecoilState(itineraryState);

  const clickHandler = () => {
    setTheTop({
      title: item.title,
      destinations: item.destinations,
    });
    navigate(`${ROUTE_PATHS.itineraryList}/${item.itinerary_id}`);
  };

  const menuHandler = (event: React.MouseEvent<HTMLImageElement>) => {
    event.stopPropagation();
    setItinerary(item);
    setIsMenuModalOpen(true);
  };

  return (
    <li className={styles.itinerary} onClick={clickHandler}>
      <div className={styles.topWrapper}>
        <span className={styles.time}>
          {item.timestamp.slice(0, item.timestamp.indexOf('T'))}
        </span>
        <img src={menu} onClick={menuHandler} alt="메뉴버튼이미지" />
      </div>
      <div className={styles.titleWrapper}>
        <h3 className={styles.title}>{item.title}</h3>
      </div>
      <Destinations destinations={item.destinations} />
    </li>
  );
}
