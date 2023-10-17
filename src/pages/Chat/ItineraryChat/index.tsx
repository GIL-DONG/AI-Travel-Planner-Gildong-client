import React, { useState, useRef, useEffect } from 'react';
import { TbSend } from 'react-icons/tb';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router';
import { MdCancel } from 'react-icons/md';
import Button from '@/components/Common/Button';
import ChatLoading from '@/components/Chat/ChatLoading';
import MarkDown from '@/components/Chat/MarkDown';
import { API_URLS, BASE_URL } from '@/constants/config';
import Header from '@/components/Common/Header';
import ImageUploadButton from '@/components/Chat/ImageUploadButton';
import SpeechToTextButton from '@/components/Chat/SpeechToTextButton';
import {
  imageState,
  itineraryState,
  uploadImageState,
} from '@/store/atom/travelAtom';
import Destinations from '@/components/Travel/Destinations';
import { getConversationAPI } from '@/services/travel';
import styles from './styles.module.scss';
interface ChatTypes {
  question: string;
  answer: string;
  itinerary?: string;
}

export default function ItineraryChat() {
  const { id } = useParams();
  const [value, setValue] = useState('');
  const [list, setList] = useState<ChatTypes[]>([]);
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  const [stop, setStop] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isMicOn, setIsMicOn] = useState(false);
  const [isMicLoading, setIsMicLoading] = useState(false);
  const image = useRecoilValue(imageState);
  const setImage = useSetRecoilState(imageState);
  const itinerary = useRecoilValue(itineraryState);
  const uploadImage = useRecoilValue(uploadImageState);
  const [isImageOpen, setIsImageOpen] = useState(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleWheel = () => {
    if (
      scrollRef.current[1] &&
      scrollRef.current[2] &&
      scrollRef.current[1]?.scrollTop + scrollRef.current[1]?.clientHeight <
        scrollRef.current[2]?.clientHeight
    ) {
      setStop(true);
    }
  };

  const fetchSSE = async (text?: string) => {
    try {
      setIsChatLoading(true);
      setQuestion(value || text || '');
      setValue('');
      setStop(false);
      const response = await fetch(`${BASE_URL}${API_URLS.itineraryChat}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('access_token')
            ? `Bearer ${sessionStorage.getItem('access_token')}`
            : '',
        },
        // credentials: 'include',
        body: JSON.stringify({
          session_id: id || '',
          question: value || text || '',
          image_name: image || '',
        }),
      });
      const reader =
        response.body?.pipeThrough(new TextDecoderStream()).getReader() ??
        false;
      let str = '';
      let itineraryId = '';
      if (reader) {
        for (;;) {
          const { value, done } = await reader.read();
          setIsChatLoading(false);

          if (done) break;
          const regex = /{[^}]*}/g;
          const matches = value.match(regex) || [];

          if (matches) {
            for (let i = 0; i < matches.length; i++) {
              const data = JSON.parse(matches[i]);
              if (data.itinerary_id) {
                itineraryId = data.itinerary_id;
              }
              if (data.message !== 'completed') {
                setAnswer((str += data.message));
              }
            }
          }
        }
      }
      setList([
        ...list,
        {
          question: value || text || '',
          answer: str,
          itinerary: itineraryId,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setQuestion('');
      setAnswer('');
      setImage('');
    }
  };

  const handleSubmit = async () => {
    await fetchSSE();
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSubmit();
    }
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
  }, [answer]);

  const getItineraryChat = async () => {
    if (id) {
      const data = await getConversationAPI(id);
      if (data) {
        const chatList = data.data.map((el: ItineraryChatTypes) => {
          return { question: el.user_message, answer: el.formatted_ai_message };
        });
        setList(chatList);
      }
    }
  };

  useEffect(() => {
    getItineraryChat();
  }, []);

  // const UpdateItinerary = async () => {
  //   if (itineraryId) {
  //     const res = await getAddItineraryAPI(itineraryId);
  //     if (res.message === 'Itinerary registered successfully.') {
  //       const data = await getItineraryDetailAPI(itineraryId);
  //       if (data?.data) {
  //         const title = data.data?.title;
  //         const list = data.data?.schedule?.map(
  //           (el: itineraryScheduleTypes) => el.title,
  //         );
  //         console.log(title);
  //         console.log(list);
  //       }
  //     }
  //   }
  // };

  // useEffect(() => {
  //   UpdateItinerary();
  // }, [itineraryId]);

  return (
    <>
      <Header back={true}>{itinerary.title}</Header>
      <div className={styles.destination}>
        <Destinations destinations={itinerary.destinations} />
      </div>
      <div className={`${styles.pageWrapper} colorLayout`}>
        <div className={styles.content}>
          <div
            className={styles.questionContainer}
            ref={(el) => (scrollRef.current[1] = el)}
            onWheel={handleWheel}
          >
            <div className={styles.questionBackground}>
              <div ref={(el) => (scrollRef.current[2] = el)}>
                {list?.map((el, index) => (
                  <div className={styles.question} key={index}>
                    {uploadImage ? (
                      <div className={styles.uploadImage}>
                        <img src={uploadImage} />
                      </div>
                    ) : null}
                    {el.question}
                    <div className={styles.answer}>
                      <MarkDown text={el.answer} />
                    </div>
                  </div>
                ))}
                {question ? (
                  <div
                    className={styles.question}
                    ref={(el) => {
                      scrollRef.current[0] = el;
                    }}
                  >
                    {uploadImage ? (
                      <div className={styles.uploadImage}>
                        <img src={uploadImage} />
                      </div>
                    ) : null}
                    {question}
                    <div className={styles.answer}>
                      {isChatLoading ? (
                        <ChatLoading />
                      ) : (
                        <MarkDown text={answer} />
                      )}
                    </div>
                  </div>
                ) : null}
              </div>
              {stop ? null : <div className={styles.margin}></div>}
            </div>
            <div className={styles.chatContainer}>
              <div className={styles.chatWrapper}>
                <div className={styles.chat}>
                  {isImageOpen ? (
                    <div className={styles.imageContainer}>
                      <div className={styles.uploadImage}>
                        <img src={uploadImage} />
                        <span className={styles.cancel}>
                          <Button
                            icon={<MdCancel />}
                            iconBtn={true}
                            color="black"
                            onClick={() => {
                              setIsImageOpen(false);
                            }}
                          >
                            취소
                          </Button>
                        </span>
                      </div>
                    </div>
                  ) : null}
                  <div className={styles.icon}>
                    <ImageUploadButton setIsImageOpen={setIsImageOpen} />
                  </div>
                  {isMicOn ? (
                    <div className={styles.textWrapper}>
                      <div className={styles.typingText}>
                        듣고 있습니다. 마이크에 대고 계속 말해주세요!
                      </div>
                    </div>
                  ) : isMicLoading ? (
                    <div className={styles.textWrapper}>
                      <ChatLoading />
                    </div>
                  ) : (
                    <input
                      className={styles.input}
                      onChange={handleInput}
                      value={value}
                      onKeyDown={handleEnter}
                      placeholder="무엇이든 물어보세요!"
                    />
                  )}
                  <div className={styles.send}>
                    {value ? (
                      <Button
                        size="sm"
                        color="white"
                        icon={<TbSend />}
                        iconBtn={true}
                        variant="primary"
                        onClick={handleSubmit}
                      />
                    ) : (
                      <SpeechToTextButton
                        setValue={setValue}
                        isMicOn={isMicOn}
                        setIsMicOn={setIsMicOn}
                        setIsMicLoading={setIsMicLoading}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
