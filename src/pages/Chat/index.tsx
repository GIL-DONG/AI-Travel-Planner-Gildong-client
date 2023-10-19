import React, { useState, useRef, useEffect } from 'react';
import { TbSend } from 'react-icons/tb';
import { TbBeach } from 'react-icons/tb';
import { FaWheelchair } from 'react-icons/fa';
import { FaBlind } from 'react-icons/fa';
import { ImFire } from 'react-icons/im';
import { AiOutlineArrowRight, AiFillCloseCircle } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '@/components/Common/Button';
import ChatLoading from '@/components/Chat/ChatLoading';
import MarkDown from '@/components/Chat/MarkDown';
import { API_URLS, BASE_URL, ROUTE_PATHS } from '@/constants/config';
import Header from '@/components/Common/Header';
import ImageUploadButton from '@/components/Chat/ImageUploadButton';
import SpeechToTextButton from '@/components/Chat/SpeechToTextButton';
import gildong from '@/assets/gildong_3d.png';
import AddItineraryButton from '@/components/Travel/AddItineraryButton';
import { imageState } from '@/store/atom/travelAtom';
import { mainChatListState, sessionIdState } from '@/store/atom/chatAtom';
import beach from '@/assets/beach.png';
import blindperson from '@/assets/blindperson.png';
import mountain from '@/assets/mountain.png';
import wheelchair from '@/assets/wheelchair.png';
import styles from './styles.module.scss';

interface ChatProps {
  home?: boolean;
}

export default function Chat({ home }: ChatProps) {
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
  const [isMicOn, setIsMicOn] = useState(false);
  const [isMicLoading, setIsMicLoading] = useState(false);
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
      setIsImageOpen(false);
      const response = await fetch(`${BASE_URL}${API_URLS.mainChat}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionStorage.getItem('access_token')
            ? `Bearer ${sessionStorage.getItem('access_token')}`
            : '',
        },
        // credentials: 'include',
        body: JSON.stringify({
          session_id: sessionId,
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
  }, [answer]);

  return (
    <>
      <Header>AI Travel Planner 길동이</Header>
      <div className={`${styles.pageWrapper} colorLayout`}>
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
                      <img src={blindperson} />
                    </div>
                  </div>
                  <div
                    className={styles.example}
                    onClick={() => {
                      fetchSSE(
                        '내가 보내준 이미지와 비슷한 분위기의 여행지를 알려줄래?',
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
                          <Button
                            icon={<AiFillCloseCircle />}
                            iconBtn={true}
                            color="black"
                            onClick={() => {
                              setImage('');
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
                    {value || isImageOpen ? (
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
