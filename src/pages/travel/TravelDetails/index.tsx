import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';
import { getTravelDetailAPI } from '@/services/travel';
import { TravelDetailsTypes } from '@/types/travel';
import useStatus from '@/hooks/useStatus';
import Loading from '@/components/common/Loading';
import DisabilityInfoBox from '@/components/travel/DisabilityInfoBox';
import styles from './styles.module.scss';

export default function TravelDetails() {
  const { id } = useParams();
  const [travelDetailsList, setTravelDetailsList] =
    useState<TravelDetailsTypes>({
      title: '',
      overview: '',
      contenttypeid: '',
      addr: '',
      tel: '',
      zipcode: '',
      url: '',
      physical: '',
      visual: '',
      hearing: '',
    });
  const [isLoading, setIsLoading] = useState(false);
  useStatus('travelDetails', '');

  const getTravelDetail = async (id: string) => {
    setIsLoading(true);
    const response = await getTravelDetailAPI(id);
    if (response?.data) {
      setTravelDetailsList(response?.data?.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getTravelDetail(id);
    }
  }, [id]);

  return (
    <>
      <Helmet>
        <title>Travel Destination Details</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <main className={styles.pageWrapper}>
          <h1 className={styles.title}>{travelDetailsList.title}</h1>
          {travelDetailsList?.url && (
            <img
              src={travelDetailsList.url}
              className={styles.img}
              alt="여행지이미지"
            />
          )}
          <div className={styles.contentWrapper}>
            {travelDetailsList?.addr && (
              <div className={styles.content}>
                <FaMapMarkerAlt /> {travelDetailsList.addr}
              </div>
            )}
            {travelDetailsList?.tel && (
              <div className={styles.content}>
                <BsFillTelephoneFill /> {travelDetailsList.tel}
              </div>
            )}
            {travelDetailsList?.overview && (
              <p className={styles.info}>
                {travelDetailsList.overview.replaceAll('<br>', '')}
              </p>
            )}
            {travelDetailsList?.visual &&
              travelDetailsList?.physical &&
              travelDetailsList?.hearing && (
                <DisabilityInfoBox travelDetailsList={travelDetailsList} />
              )}
          </div>
        </main>
      )}
    </>
  );
}
