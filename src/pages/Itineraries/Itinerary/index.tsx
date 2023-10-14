import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Common/Header';
import { getItineraryDetailAPI } from '@/services/travel';
import { itineraryScheduleTypes } from '@/types/travel';
import groupObjectsByField from '@/utils/groupObjectsByField';
import styles from './styles.module.scss';

interface itineraryDetailTypes {
  schedule: itineraryScheduleTypes[];
  title: string;
  uuid: string;
}

export default function Itinerary() {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState<itineraryDetailTypes>();
  const [dateList, setDateList] = useState<string[]>([]);
  const [groupByDate, setGroupByDate] = useState<
    Record<string, itineraryScheduleTypes[]>
  >({});

  const getItinerary = async () => {
    if (id) {
      const data = await getItineraryDetailAPI(id + '');
      if (data.data) {
        setItinerary(data.data);
        setGroupByDate(groupObjectsByField(data.data?.schedule || [], 'date'));
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
  }, [groupByDate]);

  return (
    <>
      <Header back={true}>{itinerary?.title}</Header>
      <div className={`${styles.pageWrapper} colorLayout`}>
        <div className={styles.container}>
          {dateList.map((el, index) => (
            <div key={index}>
              {groupByDate[el]?.map((el, index) => (
                <div key={index}>
                  <div>{el.title}</div>
                  <div>{el.description}</div>
                  <div>{el.start_time}</div>
                  <div>{el.end_time}</div>
                  <div>{el.url}</div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
