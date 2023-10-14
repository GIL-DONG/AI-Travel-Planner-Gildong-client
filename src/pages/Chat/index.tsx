import React, { useState, useRef, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbSend } from 'react-icons/tb';
import { TbBeach } from 'react-icons/tb';
import { FaWheelchair } from 'react-icons/fa';
import { FaBlind } from 'react-icons/fa';
import { ImFire } from 'react-icons/im';
import { AiOutlineArrowRight } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/Common/Button';
import ChatLoading from '@/components/Chat/ChatLoading';
import MarkDown from '@/components/Chat/MarkDown';
import { API_URLS, BASE_URL, ROUTE_PATHS } from '@/constants/config';
import Header from '@/components/Common/Header';
import ImageUploadButton from '@/components/Chat/ImageUploadButton';
import SpeechToTextButton from '@/components/Chat/SpeechToTextButton';
import gildong from '@/assets/gildong_3d.png';
import AddItineraryButton from '@/components/Travel/AddItineraryButton';
import styles from './styles.module.scss';

interface ChatTypes {
  question: string;
  answer: string;
  itinerary: string;
}

interface ChatProps {
  home?: boolean;
}

export default function Chat({ home }: ChatProps) {
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [list, setList] = useState<ChatTypes[]>([]);
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  const [stop, setStop] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);

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
      const response = await fetch(`${BASE_URL}${API_URLS.mainChat}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token')
            ? `Bearer ${localStorage.getItem('access_token')}`
            : '',
        },
        // credentials: 'include',
        body: JSON.stringify({
          session_id: sessionStorage.getItem('session_id')
            ? sessionStorage.getItem('session_id') + ''
            : '',
          question: value || text || '',
        }),
      });
      const reader =
        response.body?.pipeThrough(new TextDecoderStream()).getReader() ??
        false;
      let str = '';
      let itinerary = '';
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
                sessionStorage.setItem('session_id', data.session_id);
              }
              if (data.itinerary_id) {
                sessionStorage.setItem('itinerary_id', data.itinerary_id);
                itinerary = data.itinerary_id;
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
          itinerary: itinerary,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setQuestion('');
      setAnswer('');
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

  return (
    <>
      <Header>AI Travel Planner 길동이</Header>
      <div
        className={`${styles.pageWrapper} colorLayout`}
        onClick={() => setIsOpen(false)}
      >
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
                    <div className={styles.question} key={index}>
                      {el.question}
                      <div className={styles.answer}>
                        <MarkDown text={el.answer} />
                        {el.itinerary ? (
                          <div className={styles.addButton}>
                            <AddItineraryButton id={el.itinerary} />;
                          </div>
                        ) : null}
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
                      fetchSSE('어디든 바다가 있는 곳으로 떠나고 싶어');
                      navigate(ROUTE_PATHS.chat);
                    }}
                  >
                    <TbBeach />
                    <span className={styles.text}>
                      어디든 바다가 있는 곳으로 떠나고 싶어
                    </span>
                    <div className={styles.go}>
                      <AiOutlineArrowRight />
                    </div>
                  </div>
                  <div
                    className={styles.example}
                    onClick={() => {
                      fetchSSE(
                        '휠체어로 갈 수 있는 3박 4일 부산여행 일정을 추천해줘!',
                      );
                      navigate(ROUTE_PATHS.chat);
                    }}
                  >
                    <FaWheelchair />
                    <span className={styles.text}>
                      휠체어로 갈 수 있는 3박 4일 부산여행 일정을 추천해줘!
                    </span>
                    <div className={styles.go}>
                      <AiOutlineArrowRight />
                    </div>
                  </div>
                  <div
                    className={styles.example}
                    onClick={() => {
                      fetchSSE(
                        '시각장애인도 갈 수 있는 2박 3일 통영여행 일정을 추천해줘',
                      );
                      navigate(ROUTE_PATHS.chat);
                    }}
                  >
                    <FaBlind />
                    <span className={styles.text}>
                      시각장애인도 갈 수 있는 2박 3일 통영여행 일정을 추천해줘
                    </span>
                    <div className={styles.go}>
                      <AiOutlineArrowRight />
                    </div>
                  </div>
                  <div className={styles.example}>
                    <ImFire />
                    <span
                      className={styles.text}
                      onClick={() => {
                        fetchSSE('요즘 사람들이 많이 가는 여행지로 추천해줘');
                        navigate(ROUTE_PATHS.chat);
                      }}
                    >
                      요즘 사람들이 많이 가는 여행지로 추천해줘
                    </span>
                    <div className={styles.go}>
                      <AiOutlineArrowRight />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.chatContainer}>
              <div className={styles.chatWrapper}>
                <div className={styles.chat}>
                  <div
                    className={styles.icon}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Button
                      size="sm"
                      variant="default"
                      color="secondary"
                      icon={<AiOutlinePlus />}
                      iconBtn={true}
                      onClick={() => setIsOpen(true)}
                    />
                    {isOpen ? (
                      <div className={styles.button}>
                        <ImageUploadButton />
                      </div>
                    ) : null}
                  </div>
                  <input
                    className={styles.input}
                    onChange={handleInput}
                    value={value}
                    onKeyDown={handleEnter}
                    placeholder="무엇이든 물어보세요!"
                  />
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
