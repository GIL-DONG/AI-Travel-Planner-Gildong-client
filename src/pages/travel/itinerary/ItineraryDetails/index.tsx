import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { getItineraryDetailsAPI } from '@/services/travel';
import groupObjectsByField from '@/utils/groupObjectsByField';
import { theTopState } from '@/store/atom/travelAtom';
import useStatus from '@/hooks/useStatus';
import Loading from '@/components/common/Loading';
import ItineraryDetailsInfoBox from '@/components/travel/ItineraryDetailsInfoBox';
import Error from '@/pages/error/Error';
import { ItineraryScheduleTypes } from '@/types/travel';
import styles from './styles.module.scss';

export default function ItineraryDetails() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState('');
  const [itineraryDetailsList, setItineraryDetailsList] = useState<string[]>(
    [],
  );
  const theTop = useRecoilValue(theTopState);
  useStatus('itineraryDetails', theTop?.title);

  const getItineraryDetails = async () => {
    if (id) {
      const response = await getItineraryDetailsAPI(id);
      return groupObjectsByField(response?.data?.data?.schedule || [], 'date');
    }
  };

  const { data, isLoading, isError } = useQuery<
    Record<string, ItineraryScheduleTypes[]> | any
  >(['itineraryDetails'], getItineraryDetails);

  useEffect(() => {
    const keyList = [];
    for (const key in data) {
      keyList.push(key);
    }
    setItineraryDetailsList(keyList);
    setCurrentTab(keyList[0]);
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <Helmet>
        <title>Itinerary Details</title>
      </Helmet>
      <main className={styles.pageWrapper}>
        <div className={styles.container}>
          <ItineraryDetailsInfoBox
            itineraryDetailsList={itineraryDetailsList}
            groupByDate={data}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />
        </div>
      </main>
    </>
  );
}
