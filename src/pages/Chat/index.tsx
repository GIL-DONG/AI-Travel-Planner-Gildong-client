import React, { useState, useRef, useEffect } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { TbSend } from 'react-icons/tb';
import Button from '@/components/Common/Button';
import ChatLoading from '@/components/Chat/ChatLoading';
import MarkDown from '@/components/Chat/MarkDown';
import { API_URLS, BASE_URL } from '@/constants/config';
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
          },
          // credentials: 'include',
          body: JSON.stringify({
            session_id: '',
            question: value,
          }),
        });
        const reader =
          response.body?.pipeThrough(new TextDecoderStream()).getReader() ??
          false;
        if (reader) {
          setIsChatLoading(false);
          for (;;) {
            const { value, done } = await reader.read();
            if (done) break;
            value
              .split('}')
              .map((el) => {
                if (el) {
                  sessionStorage.setItem(
                    'session_id',
                    JSON.parse(el + '}').session_id,
                  );
                  sessionStorage.setItem(
                    'itinerary_id',
                    JSON.parse(el + '}').itinerary_id,
                  );
                  return JSON.parse(el + '}').message;
                } else {
                  return '';
                }
              })
              .forEach((el) => setAnswer((prev) => prev + el));
          }
        }
        setList([
          ...list,
          {
            question: value,
            answer: answer,
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

  useEffect(() => {
    console.log(answer);
  }, [answer]);

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
        </div>
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
  );
}
