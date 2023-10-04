import React, { useState, useRef, useEffect } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import { TbSend } from 'react-icons/tb';
import Button from '@/components/Common/Button';
import ChatLoading from '@/components/chat/ChatLoading';
import MarkDown from '@/components/chat/MarkDown';
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
    // try {
    //   setIsChatLoading(true);
    //   setQuestion(value);
    //   setValue('');
    //   setStop(false);
    //   const data: ChatQuestionTypes = {
    //     session_id: '',
    //     question: value,
    //   };
    //   const response = await postChatAPI(data);
    //   setAnswer(response);
    //   setList([
    //     ...list,
    //     {
    //       question: value,
    //       answer: response,
    //     },
    //   ]);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsChatLoading(false);
    //   setQuestion('');
    //   setAnswer('');
    // }

    const fetchSSE = () => {
      setIsChatLoading(true);
      setQuestion(value);
      setValue('');
      setStop(false);
      fetch('http://211.169.248.182:5040/chatbot/main', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          session_id: '',
          question: value,
        }),
      })
        .then(async (response) => {
          const reader = response.body!.getReader();
          const decoder = new TextDecoder();

          // const readChunk: any = () => {
          //   return reader.read().then(appendChunks);
          // };

          // const appendChunks = (result: any) => {
          //   const chunk = decoder.decode(result.value || new Uint8Array(), {
          //     stream: !result.done,
          //   });

          //   const parseData = JSON.parse(chunk);
          //   console.log(parseData);

          //   if (!result.done) {
          //     return readChunk();
          //   }
          // };

          // return readChunk();
          for (;;) {
            const { value, done } = await reader.read();
            if (done) {
              break;
            }

            const decodedChunk = decoder.decode(value, {
              stream: !done,
            });

            console.log(JSON.parse(decodedChunk));
          }
        })
        .then(() => {
          setIsChatLoading(false);
          setQuestion('');
          setAnswer('');
        })
        .catch((error) => {
          console.error(error);
        });
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
