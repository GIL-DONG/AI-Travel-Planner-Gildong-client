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
  const [detailData, setDetailData] = useState<TravelDetailsTypes>({
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
      setDetailData(response?.data?.data);
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
          <h1 className={styles.title}>{detailData.title}</h1>
          {detailData?.url && (
            <img
              src={detailData.url}
              className={styles.img}
              alt="여행지이미지"
            />
          )}
          <div className={styles.contentWrapper}>
            {detailData?.addr && (
              <div className={styles.content}>
                <FaMapMarkerAlt /> {detailData.addr}
              </div>
            )}
            {detailData?.tel && (
              <div className={styles.content}>
                <BsFillTelephoneFill /> {detailData.tel}
              </div>
            )}
            {detailData?.overview && (
              <p className={styles.info}>
                {detailData.overview.replaceAll('<br>', '')}
              </p>
            )}
            {detailData?.visual &&
              detailData?.physical &&
              detailData?.hearing && (
                <DisabilityInfoBox detailData={detailData} />
              )}
          </div>
        </main>
      )}
    </>
  );
}
