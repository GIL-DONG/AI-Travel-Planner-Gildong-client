import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { getTravelDetailAPI } from '@/services/travel';
import { detailType } from '@/types/travel';
import Header from '@/components/Common/Header';
import styles from './styles.module.scss';
export default function Detail() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
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
  const tabArr = [
    { name: '시각장애인', content: detailData.visual },
    { name: '지체장애인', content: detailData.physical },
    { name: '청각장애인', content: detailData.hearing },
  ];

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
    <>
      <Header back={true} />
      <div className={`${styles.pageWrapper} colorLayout`}>
        <div className={styles.title}>{detailData.title}</div>
        {detailData.url ? (
          <img src={detailData.url} className={styles.img} />
        ) : null}
        <div className={styles.contentWrapper}>
          <div className={styles.content}>
            <FaMapMarkerAlt /> {detailData.addr}
          </div>
          {detailData.tel ? (
            <div className={styles.content}>
              <BsFillTelephoneFill /> {detailData.tel}{' '}
            </div>
          ) : null}
          <p className={styles.info}>
            {detailData.overview.replaceAll('<br>', '')}
          </p>
          <ul className={styles.tabWrapper}>
            {tabArr.map((el, index) => (
              <li
                key={index}
                className={
                  index === currentTab
                    ? `${styles.tab} ${styles.focused}`
                    : styles.tab
                }
                onClick={() => setCurrentTab(index)}
              >
                {el.name}
              </li>
            ))}
          </ul>
          <p className={styles.tabContent}>{tabArr[currentTab].content}</p>
        </div>
      </div>
    </>
  );
}
