import { useRecoilValue } from 'recoil';
import useMouseDrag from '@/hooks/useMouseDrag';
import { DestinationsTypes } from '@/types/travel';
import { userDisabilityTypeState } from '@/store/atom/userAtom';
import styles from './styles.module.scss';

interface DestinationsProps {
  destinations?: DestinationsTypes[];
}
export default function Destinations({ destinations }: DestinationsProps) {
  const disabilityType = useRecoilValue(userDisabilityTypeState);
  const { scrollRef, isDrag, onDragStart, onDragEnd, onThrottleDragMove } =
    useMouseDrag();
  return (
    <div
      className={styles.container}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragEnd}
      onMouseMove={isDrag ? onThrottleDragMove : undefined}
      ref={(e) => (scrollRef.current = e)}
    >
      {destinations?.map((el, index) => (
        <div className={styles.content} key={index}>
          <div className={styles.circleWrapper}>
            <div
              className={
                index === 0
                  ? `${styles.first} ${styles.invisible}`
                  : styles.first
              }
            ></div>
            {disabilityType &&
            ((disabilityType + '' === 'hearing' && el.hearing) ||
              (disabilityType + '' === 'visual' && el.visual) ||
              (disabilityType + '' === 'physical' && el.physical)) ? (
              <div className={styles.point} />
            ) : (
              <div className={styles.second} />
            )}
            <div
              className={
                index === destinations?.length - 1
                  ? `${styles.third} ${styles.invisible}`
                  : styles.third
              }
            ></div>
          </div>
          <div className={styles.destination}>{el.title}</div>
        </div>
      ))}
    </div>
  );
}
