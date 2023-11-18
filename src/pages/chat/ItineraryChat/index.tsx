import { useRef, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router';
import { theTopState } from '@/store/atom/travelAtom';
import Destinations from '@/components/travel/Destinations';
import useStatus from '@/hooks/useStatus';
import useItinerary from '@/hooks/useItinerary';
import useFetchStreamData from '@/hooks/useFetchStreamData';
import ChatRoomBox from '@/components/chat/ChatRoomBox';
import ChatBar from '@/components/chat/ChatBar';
import Loading from '@/components/common/Loading';
import styles from './styles.module.scss';

export default function ItineraryChat() {
  const { id } = useParams();
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  const theTop = useRecoilValue(theTopState);
  useStatus('itineraryChat', theTop.title);
  const { isLoading, itineraryChatList, setItineraryChatList } =
    useItinerary(id);
  const {
    chatList,
    question,
    setQuestion,
    isStopedScroll,
    setIsStopedScroll,
    isOpenImage,
    setIsOpenImage,
    fetchStreamData,
  } = useFetchStreamData(itineraryChatList, setItineraryChatList);

  const submitHandler = async () => {
    setIsOpenImage(false);
    await fetchStreamData('', '', id);
  };

  const refHandler = (el: HTMLDivElement | null, number: number) => {
    scrollRef.current[number] = el;
  };

  const wheelHandler = () => {
    if (
      scrollRef.current[1] &&
      scrollRef.current[2] &&
      scrollRef.current[1]?.scrollTop + scrollRef.current[1]?.clientHeight <
        scrollRef.current[2]?.clientHeight
    ) {
      setIsStopedScroll(true);
    }
  };

  useEffect(() => {
    if (
      scrollRef.current[1] &&
      scrollRef.current[2] &&
      scrollRef.current[1]?.scrollTop + scrollRef.current[1]?.clientHeight <
        scrollRef.current[2]?.clientHeight
    ) {
      scrollRef.current[2]?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
    scrollRef.current[0]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [itineraryChatList]);

  return (
    <main>
      <div className={styles.destination}>
        <Destinations destinations={theTop.destinations} />
      </div>
      <div className={styles.pageWrapper}>
        {isLoading ? (
          <Loading />
        ) : (
          <div className={styles.chatRoomContainer}>
            <div
              className={styles.chatRoom}
              ref={(el) => refHandler(el, 1)}
              onWheel={wheelHandler}
            >
              <ChatRoomBox
                chatList={chatList}
                isStopedScroll={isStopedScroll}
                refHandler={refHandler}
              />
              <ChatBar
                question={question}
                setQuestion={setQuestion}
                isOpenImage={isOpenImage}
                setIsOpenImage={setIsOpenImage}
                submitHandler={submitHandler}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
