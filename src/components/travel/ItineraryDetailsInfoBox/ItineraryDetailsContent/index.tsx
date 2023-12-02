import { ItineraryScheduleTypes } from '@/types/travel';
import styles from './styles.module.scss';

interface ItineraryDetailsContentProps {
  currentTab: string;
  groupByDate: Record<string, ItineraryScheduleTypes[]>;
}

export default function ItineraryDetailsContent({
  currentTab,
  groupByDate,
}: ItineraryDetailsContentProps) {
  return (
    <section className={styles.descriptionWrapper}>
      {groupByDate[currentTab]?.map((el, index) => (
        <a href={el.url} className={styles.link} key={index}>
          <div className={styles.description}>
            {el?.image_url && (
              <img
                src={el.image_url}
                className={styles.image}
                alt="여행지이미지"
              />
            )}
            <p className={styles.content}>
              <span className={styles.title}>{el.title}</span>
              <span className={styles.time}>
                {`${el.start_time?.slice(0, -3)} ~ ${el.end_time?.slice(
                  0,
                  -3,
                )}`}
              </span>
              <span>{el.description}</span>
            </p>
          </div>
        </a>
      ))}
    </section>
  );
}
