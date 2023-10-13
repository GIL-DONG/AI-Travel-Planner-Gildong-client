import useMouseDrag from '@/hooks/useMouseDrag';
import styles from './styles.module.scss';

interface DestinationsProps {
  destinations: string[];
}
export default function Destinations({ destinations }: DestinationsProps) {
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
      {destinations.map((el, index) => (
        <div className={styles.content} key={index}>
          <div className={styles.circleWrapper}>
            <div
              className={
                index === 0
                  ? `${styles.first} ${styles.invisible}`
                  : styles.first
              }
            ></div>
            <div className={styles.second}></div>
            <div
              className={
                index === destinations?.length - 1
                  ? `${styles.third} ${styles.invisible}`
                  : styles.third
              }
            ></div>
          </div>
          <div className={styles.destination}>{el}</div>
        </div>
      ))}
    </div>
  );
}
