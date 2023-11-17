import { useRef, useEffect } from 'react';
import useStatus from '@/hooks/useStatus';
import useFetchStreamData from '@/hooks/useFetchStreamData';
import ExampleQuestionBox from '@/components/chat/ExampleQuestionBox';
import ChatBar from '@/components/chat/ChatBar';
import ChatRoomBox from '@/components/chat/ChatRoomBox';
import styles from './styles.module.scss';

interface MainChatProps {
  home?: boolean;
}

export default function MainChat({ home }: MainChatProps) {
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  useStatus('mainChat', 'AI Travel Planner 길동이');
  const {
    chatList,
    question,
    setQuestion,
    isStopedScroll,
    setIsStopedScroll,
    isOpenImage,
    setIsOpenImage,
    fetchStreamData,
  } = useFetchStreamData();

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

  const refHandler = (el: HTMLDivElement | null, number: number) => {
    scrollRef.current[number] = el;
  };

  useEffect(() => {
    scrollRef.current[0]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [question]);

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
            <ExampleQuestionBox fetchStreamData={fetchStreamData} />
          )}
          <ChatBar
            question={question}
            setQuestion={setQuestion}
            isOpenImage={isOpenImage}
            setIsOpenImage={setIsOpenImage}
            fetchStreamData={fetchStreamData}
          />
        </div>
      </div>
    </main>
  );
}
