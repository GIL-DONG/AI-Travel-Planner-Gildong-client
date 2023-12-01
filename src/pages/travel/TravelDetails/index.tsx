import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import { getTravelDetailsAPI } from '@/services/travel';
import { TravelDetailsTypes } from '@/types/travel';
import useStatus from '@/hooks/useStatus';
import DisabilityInfoBox from '@/components/travel/DisabilityInfoBox';
import Loading from '@/components/common/Loading';
import Error from '@/pages/error/Error';
import styles from './styles.module.scss';

export default function TravelDetails() {
  const { id } = useParams();
  useStatus('travelDetails', '');

  const getTravelDetails = async (id: string | undefined) => {
    if (id) {
      const response = await getTravelDetailsAPI(id);
      return response.data?.data;
    }
  };

  const { data, isLoading, isError } = useQuery<TravelDetailsTypes>(
    ['travelDetails'],
    () => getTravelDetails(id),
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <>
      <Helmet>
        <title>Travel Destination Details</title>
      </Helmet>
      <main className={styles.pageWrapper}>
        <h1 className={styles.title}>{data?.title}</h1>
        {data?.url && (
          <img src={data.url} className={styles.img} alt="여행지이미지" />
        )}
        <div className={styles.contentWrapper}>
          {data?.addr && (
            <div className={styles.content}>
              <FaMapMarkerAlt /> {data.addr}
            </div>
          )}
          {data?.tel && (
            <div className={styles.content}>
              <BsFillTelephoneFill /> {data.tel}
            </div>
          )}
          {data?.overview && (
            <p className={styles.info}>
              {data.overview.replaceAll('<br>', '')}
            </p>
          )}
          {data?.visual && data?.physical && data?.hearing && (
            <DisabilityInfoBox travelDetailsList={data} />
          )}
        </div>
      </main>
    </>
  );
}
