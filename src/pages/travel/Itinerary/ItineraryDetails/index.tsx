import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Header from '@/components/common/Header';
import { getItineraryDetailAPI } from '@/services/travel';
import { itineraryScheduleTypes } from '@/types/travel';
import groupObjectsByField from '@/utils/groupObjectsByField';
import { tabState } from '@/store/atom/travelAtom';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import styles from './styles.module.scss';

interface itineraryDetailTypes {
  schedule: itineraryScheduleTypes[];
  title: string;
  uuid: string;
}

export default function ItineraryDetails() {
  const { id } = useParams();
  const tab = useRecoilValue(tabState);
  const setTab = useSetRecoilState(tabState);
  const [itinerary, setItinerary] = useState<itineraryDetailTypes>();
  const [dateList, setDateList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupByDate, setGroupByDate] = useState<
    Record<string, itineraryScheduleTypes[]>
  >({});

  const getItinerary = async () => {
    if (id) {
      setIsLoading(true);
      const data = await getItineraryDetailAPI(id);
      if (data.data) {
        setItinerary(data.data);
        setGroupByDate(groupObjectsByField(data.data?.schedule || [], 'date'));
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getItinerary();
  }, []);

  useEffect(() => {
    const keyList = [];
    for (const key in groupByDate) {
      keyList.push(key);
    }
    setDateList(keyList);
    setTab(keyList[0]);
  }, [groupByDate]);

  return (
    <>
      <Header back={true}>{itinerary?.title}</Header>
      <div className={styles.pageWrapper}>
        {isLoading ? (
          <div className={styles.loading}>
            <LoadingSpinner />
          </div>
        ) : (
          <div className={styles.container}>
            <div className={styles.tabWrapper}>
              {dateList.map((el, index) => (
                <div
                  className={
                    el === tab ? `${styles.tab} ${styles.focus}` : styles.tab
                  }
                  key={index}
                  onClick={() => setTab(el)}
                >
                  {el}
                </div>
              ))}
            </div>
            <div className={styles.background}>
              {groupByDate[tab]?.map((el, index) => (
                <a
                  href={el.url}
                  className={styles.descriptionContainer}
                  key={index}
                >
                  <div className={styles.description}>
                    {el?.image_url ? (
                      <div className={styles.img}>
                        <img src={el.image_url} />
                      </div>
                    ) : null}
                    <div className={styles.right}>
                      <div className={styles.title}>{el.title}</div>
                      <div className={styles.time}>
                        {`${el.start_time?.slice(0, -3)} ~ ${el.end_time?.slice(
                          0,
                          -3,
                        )}`}
                      </div>
                      <div>{el.description}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
