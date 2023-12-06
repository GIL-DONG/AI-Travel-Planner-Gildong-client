import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { theTopState } from '@/store/atom/travelAtom';
import Destinations from '@/components/travel/Destinations';
import useStatus from '@/hooks/useStatus';
import useItinerary from '@/hooks/useItinerary';
import useFetchStreamData from '@/hooks/useFetchStreamData';
import ChatRoomBox from '@/components/chat/ChatRoomBox';
import ChatBar from '@/components/chat/ChatBar';
import Loading from '@/components/common/Loading';
import Error from '@/pages/error/Error';
import styles from './styles.module.scss';

export default function ItineraryChat() {
  const { id } = useParams();
  const theTop = useRecoilValue(theTopState);
  useStatus('itineraryChat', theTop.title);
  const { data, isLoading, isError } = useItinerary(id);
  const [itineraryChatList, setItineraryChatList] = useState<ChatTypes[]>([]);
  const {
    chatList,
    question,
    setQuestion,
    uploadImage,
    setUploadImage,
    isStopedScroll,
    fetchStreamData,
    refHandler,
    wheelHandler,
  } = useFetchStreamData(itineraryChatList, setItineraryChatList);

  const submitHandler = async () => {
    setUploadImage('');
    await fetchStreamData('', '', id);
  };

  useEffect(() => {
    if (data) {
      setItineraryChatList(data);
    }
  }, [data]);

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <main>
      <Helmet>
        <title>Itinerary ChatBot</title>
      </Helmet>
      <div className={styles.destination}>
        <Destinations destinations={theTop.destinations} />
      </div>
      <div className={styles.pageWrapper}>
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
              uploadImage={uploadImage}
              setQuestion={setQuestion}
              setUploadImage={setUploadImage}
              submitHandler={submitHandler}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
