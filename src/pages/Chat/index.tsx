import React, { useState, useRef, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbSend } from 'react-icons/tb';
import Button from '@/components/Common/Button';
import ChatLoading from '@/components/Chat/ChatLoading';
import MarkDown from '@/components/Chat/MarkDown';
import { API_URLS, BASE_URL } from '@/constants/config';
import Header from '@/components/Common/Header';
import styles from './styles.module.scss';

interface ChatTypes {
  question: string;
  answer: string;
}

export default function Chat() {
  const [value, setValue] = useState('');
  const [list, setList] = useState<ChatTypes[]>([]);
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  const [stop, setStop] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

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

  const handleSubmit = async () => {
    const fetchSSE = async () => {
      try {
        setIsChatLoading(true);
        setQuestion(value);
        setValue('');
        setStop(false);
        const response = await fetch(`${BASE_URL}${API_URLS.mainChat}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              `Bearer ${localStorage.getItem('access_token')}` || '',
          },
          // credentials: 'include',
          body: JSON.stringify({
            session_id: sessionStorage.getItem('session_id')
              ? sessionStorage.getItem('session_id') + ''
              : '',
            question: value,
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
                if (data.session_id) {
                  sessionStorage.setItem('session_id', data.session_id);
                }
                if (data.itinerary_id) {
                  sessionStorage.setItem('itinerary_id', data.itinerary_id);
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
            question: value,
            answer: str,
          },
        ]);
      } catch (error) {
        console.error(error);
      } finally {
        setQuestion('');
        setAnswer('');
      }
    };
    fetchSSE();
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
            <div className={styles.questionBackground}>
              <div ref={(el) => (scrollRef.current[2] = el)}>
                {list?.map((el, index) => (
                  <div className={styles.question} key={index}>
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
                  <div className={styles.icon}>
                    <Button
                      size="sm"
                      variant="default"
                      color="secondary"
                      icon={<AiOutlinePlus />}
                      iconBtn={true}
                    />
                  </div>
                  <input
                    className={styles.input}
                    onChange={handleInput}
                    value={value}
                    onKeyDown={handleEnter}
                  />
                  <div className={styles.send}>
                    <Button
                      size="sm"
                      color="white"
                      icon={<TbSend />}
                      iconBtn={true}
                      variant="primary"
                      onClick={handleSubmit}
                    />
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
