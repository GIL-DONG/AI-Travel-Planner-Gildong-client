import { ReactNode } from 'react';
import styles from './styles.module.scss';

interface DisabilityInfoContentItemProps {
  icon?: ReactNode;
  title: string;
}

export default function DisabilityInfoContentItem({
  icon,
  title,
}: DisabilityInfoContentItemProps) {
  return (
    <li className={styles.iconWrapper}>
      {icon}
      {title}
    </li>
  );
}
