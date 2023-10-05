import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTravelDetailAPI } from '@/services/travel';
import { detailType } from '@/types/travel';
import styles from './styles.module.scss';

export default function Detail() {
  const { id } = useParams();
  const [detailData, setDetailData] = useState<detailType>({
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
  const getTravelDetail = async (id: string) => {
    const data = await getTravelDetailAPI(id);
    setDetailData(data.data);
  };

  useEffect(() => {
    if (id) {
      getTravelDetail(id);
    }
  }, [id]);

  return (
    <div className={`${styles.pageWrapper} colorLayout`}>
      {detailData.url ? (
        <img src={detailData.url} className={styles.img} />
      ) : null}
      <div>{detailData.title}</div>
      <div>
        주소: {detailData.addr} ({detailData.zipcode})
      </div>
      {detailData.tel ? <div>전화번호: {detailData.tel} </div> : null}
      <div>정보: {detailData.overview.replaceAll('<br>', '')} </div>
      <div>지체장애인: {detailData.physical} </div>
      <div>시각장애인: {detailData.visual} </div>
      <div>청각장애인: {detailData.hearing} </div>
    </div>
  );
}
