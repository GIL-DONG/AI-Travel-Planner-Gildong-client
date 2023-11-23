import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { getItineraryDetailsAPI } from '@/services/travel';
import { ItineraryScheduleTypes } from '@/types/travel';
import groupObjectsByField from '@/utils/groupObjectsByField';
import { tabState, theTopState } from '@/store/atom/travelAtom';
import useStatus from '@/hooks/useStatus';
import Loading from '@/components/common/Loading';
import styles from './styles.module.scss';

export default function ItineraryDetails() {
  const { id } = useParams();
  const tab = useRecoilValue(tabState);
  const setTab = useSetRecoilState(tabState);
  const [dateList, setDateList] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [groupByDate, setGroupByDate] = useState<
    Record<string, ItineraryScheduleTypes[]>
  >({});
  const theTop = useRecoilValue(theTopState);
  useStatus('itineraryDetails', theTop?.title);

  const getItineraryDetails = async () => {
    if (id) {
      setIsLoading(true);
      const data = await getItineraryDetailsAPI(id);
      if (data.data) {
        setGroupByDate(groupObjectsByField(data.data?.schedule || [], 'date'));
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getItineraryDetails();
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
      <Helmet>
        <title>Itinerary Details</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <main className={styles.pageWrapper}>
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
            <div className={styles.descriptionWrapper}>
              {groupByDate[tab]?.map((el, index) => (
                <a href={el.url} className={styles.link} key={index}>
                  <div className={styles.description}>
                    {el?.image_url && (
                      <img
                        src={el.image_url}
                        className={styles.image}
                        alt="여행지이미지"
                      />
                    )}
                    <div className={styles.content}>
                      <span className={styles.title}>{el.title}</span>
                      <span className={styles.time}>
                        {`${el.start_time?.slice(0, -3)} ~ ${el.end_time?.slice(
                          0,
                          -3,
                        )}`}
                      </span>
                      <span>{el.description}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </main>
      )}
    </>
  );
}
