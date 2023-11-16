import React, { useState, useRef, useEffect } from 'react';
import { TbSend } from 'react-icons/tb';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useParams } from 'react-router';
import { BsFillMicFill } from 'react-icons/bs';
import Button from '@/components/common/Button';
import ChatLoading from '@/components/chat/ChatLoading';
import MarkDown from '@/components/chat/MarkDown';
import { API_URLS, BASE_URL } from '@/constants/config';
import Header from '@/components/common/Header';
import ImageUploadButton from '@/components/chat/ImageUploadButton';
import { imageState, theTopState } from '@/store/atom/travelAtom';
import Destinations from '@/components/travel/Destinations';
import {
  getAddItineraryAPI,
  getConversationAPI,
  getItineraryDetailAPI,
} from '@/services/travel';
import { itineraryScheduleTypes } from '@/types/travel';
import { itineraryIdState } from '@/store/atom/chatAtom';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import remove from '@/assets/remove.png';
import voiceLoading from '@/assets/loading_voice.gif';
import useRecording from '@/hooks/useRecording';
import styles from './styles.module.scss';

export default function ItineraryChat() {
  const { id } = useParams();
  const [value, setValue] = useState('');
  const [list, setList] = useState<ChatTypes[]>([]);
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  const [stop, setStop] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const image = useRecoilValue(imageState);
  const setImage = useSetRecoilState(imageState);
  const theTop = useRecoilValue(theTopState);
  const setTheTop = useSetRecoilState(theTopState);
  const itineraryId = useRecoilValue(itineraryIdState);
  const setItineraryId = useSetRecoilState(itineraryIdState);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    isRecording,
    isSTTLoading,
    isRecordingStarting,
    startRecording,
    stopRecording,
  } = useRecording(setValue);

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
          Authorization: localStorage.getItem('access_token')
            ? `Bearer ${localStorage.getItem('access_token')}`
            : '',
        },
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
                setItineraryId(data.itinerary_id);
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
          itinerary_id: itineraryId,
          image_name: image,
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
    setIsImageOpen(false);
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
  }, [answer, list]);

  const getItineraryChat = async () => {
    if (id) {
      setIsLoading(true);
      const data = await getConversationAPI(id);

      if (data) {
        const chatList = data.data.map((el: ItineraryChatTypes) => {
          return {
            question: el.user_message,
            answer: el.formatted_ai_message,
            image_name: el.image_name,
          };
        });
        setList(chatList);
        setIsLoading(false);
        if (itineraryId) {
          const data = await getAddItineraryAPI(itineraryId);
          if (data.message === 'Itinerary registered successfully.') {
            const res = await getItineraryDetailAPI(itineraryId);
            console.log(res);
            if (res) {
              setTheTop({
                title: res.data?.title,
                destinations: res.data?.schedule.map(
                  (el: itineraryScheduleTypes) => {
                    return { title: el.title };
                  },
                ),
              });
              setItineraryId('');
            }
          }
        }
      }
    }
  };

  useEffect(() => {
    getItineraryChat();
  }, [itineraryId]);

  return (
    <>
      <Header back={true} page="itineraryChat">
        {theTop.title}
      </Header>
      <div className={styles.destination}>
        <Destinations destinations={theTop.destinations} />
      </div>
      <div className={styles.pageWrapper}>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
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
                      {el.image_name ? (
                        <div className={styles.uploadImage}>
                          <img
                            src={`${BASE_URL}${API_URLS.viewImage}${el.image_name}`}
                          />
                        </div>
                      ) : null}
                      {el.question}
                      <div className={styles.answer}>
                        <MarkDown text={el.answer} />
                      </div>
                    </div>
                  ))}
                  {question || (image && !isImageOpen) ? (
                    <div
                      className={styles.question}
                      ref={(el) => {
                        scrollRef.current[0] = el;
                      }}
                    >
                      {image ? (
                        <div className={styles.uploadImage}>
                          <img
                            src={`${BASE_URL}${API_URLS.viewImage}${image}`}
                          />
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
                          {image ? (
                            <div className={styles.uploadImage}>
                              <img
                                src={`${BASE_URL}${API_URLS.viewImage}${image}`}
                              />
                            </div>
                          ) : null}
                          <span className={styles.cancel}>
                            <img
                              src={remove}
                              onClick={() => {
                                setImage('');
                                setIsImageOpen(false);
                              }}
                            />
                          </span>
                        </div>
                      </div>
                    ) : null}
                    {isRecording ? (
                      <div className={styles.voiceContainer}>
                        <div className={styles.voice}>
                          듣고 있습니다.
                          <div className={styles.pulse} onClick={stopRecording}>
                            <div className={styles.rectangle} />
                          </div>
                        </div>
                      </div>
                    ) : isSTTLoading ? (
                      <div className={styles.voiceContainer}>
                        <div className={styles.voice}>
                          <img src={voiceLoading} />
                        </div>
                      </div>
                    ) : null}
                    <div className={styles.icon}>
                      <ImageUploadButton setIsImageOpen={setIsImageOpen} />
                    </div>
                    <input
                      className={styles.input}
                      onChange={handleInput}
                      value={value}
                      onKeyDown={handleEnter}
                      placeholder="무엇이든 물어보세요!"
                    />
                    <div className={styles.send}>
                      {value || isImageOpen ? (
                        <Button
                          size="sm"
                          color="white"
                          icon={<TbSend />}
                          iconBtn={true}
                          variant="primary"
                          onClick={handleSubmit}
                        />
                      ) : !isRecordingStarting ? (
                        <Button
                          icon={<BsFillMicFill />}
                          size="sm"
                          color="secondary"
                          iconBtn={true}
                          onClick={startRecording}
                        >
                          녹음 시작
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
