import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
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
    fetchStreamData,
    refHandler,
    wheelHandler,
  } = useFetchStreamData(mainChatList, setMainChatList);

  const submitHandler = async () => {
    setPage(ROUTE_PATHS.mainChat);
    setUploadImage('');
    navigate(ROUTE_PATHS.mainChat);
    await fetchStreamData();
  };

  return (
    <main className={styles.pageWrapper}>
      <Helmet>
        <title>{home ? `AI Travel Planner 길동이` : `ChatBot`}</title>
      </Helmet>
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
