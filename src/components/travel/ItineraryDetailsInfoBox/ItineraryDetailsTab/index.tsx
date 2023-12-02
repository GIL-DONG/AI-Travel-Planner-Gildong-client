import React, { SetStateAction, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import styles from './styles.module.scss';

interface ItineraryDetailsTabProps {
  itineraryDetailsList: string[];
  currentTab: string;
  setCurrentTab: React.Dispatch<SetStateAction<string>>;
}

export default function ItineraryDetailsTab({
  itineraryDetailsList,
  currentTab,
  setCurrentTab,
}: ItineraryDetailsTabProps) {
  return (
    <ul className={styles.tabWrapper}>
      {itineraryDetailsList.map((el, index) => (
        <li
          className={
            el === currentTab ? `${styles.tab} ${styles.focus}` : styles.tab
          }
          key={index}
          onClick={() => setCurrentTab(el)}
        >
          {el}
        </li>
      ))}
    </ul>
  );
}
