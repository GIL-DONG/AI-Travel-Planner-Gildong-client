import React, { useState, useRef, useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { TbSend } from 'react-icons/tb';
import Button from '@components/common/Button';
import ChatLoading from '@components/chat/ChatLoading';
import { postChatAPI } from '@services/chat';
import MarkDown from '@components/chat/MarkDown';
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
    try {
      setIsChatLoading(true);
      setQuestion(value);
      setValue('');
      setStop(false);
      const data: ChatDataTypes = {
        user_id: '12345',
        session_id: 'abcd1234',
        content: value,
      };
      const response = await postChatAPI(data);
      setAnswer(response);
      setList([
        ...list,
        {
          question: value,
          answer: response,
        },
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsChatLoading(false);
      setQuestion('');
      setAnswer('');
    }
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
              color="primary"
              icon={<AiFillPlusCircle />}
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
