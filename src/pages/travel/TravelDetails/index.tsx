import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaWheelchair } from 'react-icons/fa';
import { BsFillTelephoneFill, BsFillPersonFill } from 'react-icons/bs';
import { AiFillCar, AiOutlineCheck, AiFillSound } from 'react-icons/ai';
import { MdElevator } from 'react-icons/md';
import { FaRestroom, FaDog } from 'react-icons/fa';
import { GrBraille } from 'react-icons/gr';
import { RiGuideFill } from 'react-icons/ri';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import { BsFillSignpostSplitFill } from 'react-icons/bs';
import { getTravelDetailAPI } from '@/services/travel';
import { TravelDetailsTypes } from '@/types/travel';
import useStatus from '@/hooks/useStatus';
import Loading from '@/components/common/Loading';
import styles from './styles.module.scss';

export default function TravelDetails() {
  const { id } = useParams();
  const [currentTab, setCurrentTab] = useState(0);
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
  const tabArr = [
    { name: '시각장애인', content: detailData.visual },
    { name: '지체장애인', content: detailData.physical },
    { name: '청각장애인', content: detailData.hearing },
  ];
  useStatus('travelDetails', '');

  const getTravelDetail = async (id: string) => {
    setIsLoading(true);
    const data = await getTravelDetailAPI(id);
    if (data) {
      setDetailData(data.data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getTravelDetail(id);
    }
  }, [id]);

  return (
    <div className={styles.pageWrapper}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.title}>{detailData.title}</div>
          {detailData?.url && (
            <img src={detailData.url} className={styles.img} />
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
                <>
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
                  <div className={styles.tabContent}>
                    {tabArr[currentTab].content?.split('#').map((el, index) => {
                      if (el.includes('주차')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <AiFillCar />
                            {el}
                          </div>
                        );
                      } else if (el.includes('점자')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <GrBraille />
                            {el}
                          </div>
                        );
                      } else if (el.includes('휠체어')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <FaWheelchair />
                            {el}
                          </div>
                        );
                      } else if (el.includes('엘리베이터')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <MdElevator />
                            {el}
                          </div>
                        );
                      } else if (el.includes('화장실')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <FaRestroom />
                            {el}
                          </div>
                        );
                      } else if (el.includes('보조견')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <FaDog />
                            {el}
                          </div>
                        );
                      } else if (el.includes('음성')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <AiFillSound />
                            {el}
                          </div>
                        );
                      } else if (el.includes('안내요원')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <BsFillPersonFill />
                            {el}
                          </div>
                        );
                      } else if (el.includes('안내 시스템')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <RiGuideFill />
                            {el}
                          </div>
                        );
                      } else if (el.includes('표지')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <BsFillSignpostSplitFill />
                            {el}
                          </div>
                        );
                      } else if (el.includes('비디오')) {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <MdOutlineOndemandVideo />
                            {el}
                          </div>
                        );
                      } else {
                        return (
                          <div className={styles.iconWrapper} key={index}>
                            <AiOutlineCheck /> {el}
                          </div>
                        );
                      }
                    })}
                  </div>
                </>
              )}
          </div>
        </>
      )}
    </div>
  );
}
