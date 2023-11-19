import { useRef, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import useStatus from '@/hooks/useStatus';
import useFetchStreamData from '@/hooks/useFetchStreamData';
import ExampleQuestionBox from '@/components/chat/ExampleQuestionBox';
import ChatBar from '@/components/chat/ChatBar';
import ChatRoomBox from '@/components/chat/ChatRoomBox';
import { mainChatListState, pageState } from '@/store/atom/chatAtom';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

interface MainChatProps {
  home?: boolean;
}

export default function MainChat({ home }: MainChatProps) {
  const navigate = useNavigate();
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  const mainChatList = useRecoilValue(mainChatListState);
  const setMainChatList = useSetRecoilState(mainChatListState);
  const setPage = useSetRecoilState(pageState);
  useStatus('mainChat', 'AI Travel Planner 길동이');
  const {
    chatList,
    question,
    setQuestion,
    uploadImage,
    setUploadImage,
    isStopedScroll,
    setIsStopedScroll,
    fetchStreamData,
  } = useFetchStreamData(mainChatList, setMainChatList);

  const submitHandler = async () => {
    setPage(ROUTE_PATHS.mainChat);
    setUploadImage('');
    navigate(ROUTE_PATHS.mainChat);
    await fetchStreamData();
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
    if (scrollRef.current[0]) {
      scrollRef.current[0]?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    } else if (
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
  }, [chatList]);

  return (
    <main className={styles.pageWrapper}>
      <div className={styles.chatRoomContainer}>
        <div
          className={styles.chatRoom}
          ref={(el) => refHandler(el, 1)}
          onWheel={wheelHandler}
        >
          {!home ? (
            <ChatRoomBox
              chatList={chatList}
              isStopedScroll={isStopedScroll}
              refHandler={refHandler}
            />
          ) : (
            <ExampleQuestionBox
              setUploadImage={setUploadImage}
              fetchStreamData={fetchStreamData}
            />
          )}
          <ChatBar
            question={question}
            uploadImage={uploadImage}
            setQuestion={setQuestion}
            setUploadImage={setUploadImage}
            submitHandler={submitHandler}
          />
        </div>
      </div>
    </main>
  );
}
