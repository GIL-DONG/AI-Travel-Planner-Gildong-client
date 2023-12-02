import React, { SetStateAction } from 'react';
import { DisabilityInfoListTypes } from '@/types/travel';
import styles from './styles.module.scss';

interface DisabilityInfoTabProps {
  disabilityInfoList: DisabilityInfoListTypes[];
  currentTab: number;
  setCurrentTab: React.Dispatch<SetStateAction<number>>;
}

export default function DisabilityInfoTab({
  disabilityInfoList,
  currentTab,
  setCurrentTab,
}: DisabilityInfoTabProps) {
  return (
    <ul className={styles.tabWrapper}>
      {disabilityInfoList.map((el, index) => (
        <li
          key={index}
          className={
            index === currentTab
              ? `${styles.tab} ${styles.focused}`
              : styles.tab
          }
          onClick={() => setCurrentTab(index)}
        >
          {el.name}
        </li>
      ))}
    </ul>
  );
}
