import React, { useState, useRef, useEffect } from 'react';
import { TbSend } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsFillMicFill } from 'react-icons/bs';
import Button from '@/components/common/Button';
import ChatLoading from '@/components/chat/ChatLoading';
import MarkDown from '@/components/chat/MarkDown';
import { API_URLS, BASE_URL, ROUTE_PATHS } from '@/constants/config';
import Header from '@/components/common/Header';
import ImageUploadButton from '@/components/chat/ImageUploadButton';
import gildong from '@/assets/gildong_3d.png';
import AddItineraryButton from '@/components/travel/AddItineraryButton';
import { imageState } from '@/store/atom/travelAtom';
import {
  mainChatListState,
  pageState,
  sessionIdState,
} from '@/store/atom/chatAtom';
import remove from '@/assets/remove.png';
import beach from '@/assets/beach.png';
import blindPerson from '@/assets/blind_person.png';
import mountain from '@/assets/mountain.png';
import wheelchair from '@/assets/wheelchair.png';
import voiceLoading from '@/assets/loading_voice.gif';
import useRecording from '@/hooks/useRecording';
import styles from './styles.module.scss';
interface ChatProps {
  home?: boolean;
}

export default function MainChat({ home }: ChatProps) {
  const navigate = useNavigate();
  const image = useRecoilValue(imageState);
  const setImage = useSetRecoilState(imageState);
  const sessionId = useRecoilValue(sessionIdState);
  const setSessionId = useSetRecoilState(sessionIdState);
  const list = useRecoilValue(mainChatListState);
  const setList = useSetRecoilState(mainChatListState);
  const [value, setValue] = useState('');
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  const [stop, setStop] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isImageOpen, setIsImageOpen] = useState(false);
  const setPage = useSetRecoilState(pageState);
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

  const fetchSSE = async (text?: string, imageUrl?: string) => {
    try {
      setIsChatLoading(true);
      setQuestion(value || text || '');
      setValue('');
      setStop(false);
      setIsImageOpen(false);
      const response = await fetch(`${BASE_URL}${API_URLS.mainChat}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token')
            ? `Bearer ${localStorage.getItem('access_token')}`
            : '',
        },
        body: JSON.stringify({
          session_id: sessionId,
          question: value || text || '',
          image_name: imageUrl || image || '',
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
              if (data.session_id) {
                setSessionId(data.session_id);
              }
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
          itinerary_id: itineraryId,
          image_name: imageUrl || image || '',
        },
      ]);
      setImage('');
    } catch (error) {
      console.error(error);
    } finally {
      setQuestion('');
      setAnswer('');
    }
  };

  const handleSubmit = async () => {
    setPage(ROUTE_PATHS.chat);
    setIsImageOpen(false);
    navigate(ROUTE_PATHS.chat);
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

  return (
    <>
      <Header>AI Travel Planner 길동이</Header>
      <div className={styles.pageWrapper}>
        <div className={styles.content}>
          <div
            className={styles.questionContainer}
            ref={(el) => (scrollRef.current[1] = el)}
            onWheel={handleWheel}
          >
            {!home ? (
              <div className={styles.questionBackground}>
                <div ref={(el) => (scrollRef.current[2] = el)}>
                  {list?.map((el, index) => (
                    <div
                      className={styles.question}
                      key={index}
                      ref={(el) => {
                        scrollRef.current[0] = el;
                      }}
                    >
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
                        {el.itinerary_id ? (
                          <div className={styles.addButton}>
                            <AddItineraryButton id={el.itinerary_id} />
                          </div>
                        ) : null}
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
            ) : (
              <div className={styles.default}>
                <div className={styles.title}>
                  길동이에게 여행 일정을 맡겨보세요!
                </div>
                <img src={gildong} className={styles.img} />
                <div className={styles.exampleWrapper}>
                  <div
                    className={styles.example}
                    onClick={() => {
                      fetchSSE('서울 근처에 등산하기 좋은 장소 추천해줄래?');
                      navigate(ROUTE_PATHS.chat);
                    }}
                  >
                    <span className={styles.text}>
                      서울 근처에 등산하기 좋은 장소 추천해줄래?
                    </span>
                    <div className={styles.homeImage}>
                      <img src={mountain} />
                    </div>
                  </div>
                  <div
                    className={styles.example}
                    onClick={() => {
                      fetchSSE(
                        '부산에서 휠체어 이용이 편리한 2박 3일 여행코스를 알려줄래?',
                      );
                      navigate(ROUTE_PATHS.chat);
                    }}
                  >
                    <span className={styles.text}>
                      부산에서 휠체어 이용이 편리한 2박 3일 여행코스를 알려줄래?
                    </span>
                    <div className={styles.homeImage}>
                      <img src={wheelchair} />
                    </div>
                  </div>
                  <div
                    className={styles.example}
                    onClick={() => {
                      fetchSSE(
                        ' 통영에서 시각장애인도 편하게 여행할 수 있는 1박 2일 코스 추천해줄 수 있을까?',
                      );
                      navigate(ROUTE_PATHS.chat);
                    }}
                  >
                    <span className={styles.text}>
                      통영에서 시각장애인도 편하게 여행할 수 있는 1박 2일 코스
                      추천해줄 수 있을까?
                    </span>
                    <div className={styles.homeImage}>
                      <img src={blindPerson} />
                    </div>
                  </div>
                  <div
                    className={styles.example}
                    onClick={() => {
                      setImage('20231020003408_바다사진.jpg');
                      fetchSSE(
                        '내가 보내준 이미지와 비슷한 분위기의 여행지를 알려줄래?',
                        '20231020003408_바다사진.jpg',
                      );
                      navigate(ROUTE_PATHS.chat);
                    }}
                  >
                    <span className={styles.text}>
                      내가 보내준 이미지와 비슷한 분위기의 여행지를 알려줄래?
                    </span>
                    <div className={styles.homeImage}>
                      <img src={beach} />
                    </div>
                  </div>
                </div>
              </div>
            )}
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
      </div>
    </>
  );
}
