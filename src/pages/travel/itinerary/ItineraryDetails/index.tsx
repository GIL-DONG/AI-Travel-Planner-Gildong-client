import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { getItineraryDetailsAPI } from '@/services/travel';
import { ItineraryScheduleTypes } from '@/types/travel';
import groupObjectsByField from '@/utils/groupObjectsByField';
import { theTopState } from '@/store/atom/travelAtom';
import useStatus from '@/hooks/useStatus';
import Loading from '@/components/common/Loading';
import ItineraryDetailsInfoBox from '@/components/travel/ItineraryDetailsInfoBox';
import styles from './styles.module.scss';

export default function ItineraryDetails() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('');
  const [itineraryDetailsList, setItineraryDetailsList] = useState<string[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(false);
  const [groupByDate, setGroupByDate] = useState<
    Record<string, ItineraryScheduleTypes[]>
  >({});
  const theTop = useRecoilValue(theTopState);
  useStatus('itineraryDetails', theTop?.title);

  const getItineraryDetails = async () => {
    if (id) {
      setIsLoading(true);
      const response = await getItineraryDetailsAPI(id);
      if (response?.data) {
        setGroupByDate(
          groupObjectsByField(response?.data?.data?.schedule || [], 'date'),
        );
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
    setItineraryDetailsList(keyList);
    setCurrentTab(keyList[0]);
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
            <ItineraryDetailsInfoBox
              itineraryDetailsList={itineraryDetailsList}
              groupByDate={groupByDate}
              currentTab={currentTab}
              setCurrentTab={setCurrentTab}
            />
          </div>
        </main>
      )}
    </>
  );
}
