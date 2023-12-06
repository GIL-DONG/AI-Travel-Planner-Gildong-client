import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itineraryIdState, sessionIdState } from '@/store/atom/chatAtom';
import { API_URLS, BASE_URL } from '@/constants/config';
import { headerStatusState } from '@/store/atom/globalAtom';

export default function useFetchStreamData(
  chatList: ChatTypes[],
  setChatList: React.Dispatch<SetStateAction<ChatTypes[]>>,
) {
  const scrollRef = useRef<null[] | HTMLDivElement[]>([]);
  const mainSessionId = useRecoilValue(sessionIdState);
  const status = useRecoilValue(headerStatusState);
  const itineraryId = useRecoilValue(itineraryIdState);
  const setMainSessionId = useSetRecoilState(sessionIdState);
  const setItineraryId = useSetRecoilState(itineraryIdState);
  const [question, setQuestion] = useState('');
  const [uploadImage, setUploadImage] = useState('');
  const [isStopedScroll, setIsStopedScroll] = useState(false);

  const postQuestionAPI = async (
    inputText?: string,
    imageUrl?: string,
    sessionId?: string,
  ) => {
    return await fetch(
      status.pageName === 'mainChat'
        ? `${BASE_URL}${API_URLS.mainChat}`
        : `${BASE_URL}${API_URLS.itineraryChat}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('access_token')
            ? `Bearer ${localStorage.getItem('access_token')}`
            : '',
        },
        body: JSON.stringify({
          session_id:
            status.pageName === 'mainChat' ? mainSessionId : sessionId,
          question: question || inputText || '',
          image_name: imageUrl || uploadImage || '',
        }),
      },
    );
  };

  const fetchStreamData = async (
    inputText?: string,
    imageUrl?: string,
    sessionId?: string,
  ) => {
    try {
      setIsStopedScroll(false);
      setChatList([
        ...chatList,
        {
          question: question || inputText || '',
          answer: '',
          itinerary_id: '',
          image_name: imageUrl || uploadImage || '',
        },
      ]);
      setQuestion('');
      const response = await postQuestionAPI(inputText, imageUrl, sessionId);
      const reader =
        response.body?.pipeThrough(new TextDecoderStream()).getReader() ??
        false;
      let answer = '';
      let mainItineraryId = '';
      if (reader) {
        for (;;) {
          const { value, done } = await reader.read();

          if (done) break;
          const regex = /{[^}]*}/g;
          const matches = value.match(regex) || [];

          if (matches) {
            for (let i = 0; i < matches.length; i++) {
              const data = JSON.parse(matches[i]);
              if (data.session_id && status.pageName === 'mainChat') {
                setMainSessionId(data.session_id);
              }
              if (data.itinerary_id) {
                if (status.pageName === 'mainChat') {
                  mainItineraryId = data.itinerary_id;
                } else {
                  setItineraryId(data.itinerary_id);
                }
              }
              if (data.message !== 'completed') {
                answer += data.message;

                setChatList((prevChatList) => [
                  ...prevChatList.slice(0, prevChatList.length - 1),
                  {
                    question: question || inputText || '',
                    answer: answer,
                    itinerary_id:
                      status.pageName === 'mainChat'
                        ? mainItineraryId
                        : itineraryId,
                    image_name: imageUrl || uploadImage || '',
                  },
                ]);
              }
            }
          }
        }
      }
      setUploadImage('');
    } catch (error) {
      console.error(error);
    }
  };

  const refHandler = (el: HTMLDivElement | null, number: number) => {
    scrollRef.current[number] = el;
  };

  const wheelHandler = () => {
    if (
      scrollRef.current[1] &&
      scrollRef.current[2] &&
      scrollRef.current[1]?.scrollTop + scrollRef.current[1]?.clientHeight <
        scrollRef.current[2]?.clientHeight
    ) {
      setIsStopedScroll(true);
    }
  };

  useEffect(() => {
    if (scrollRef.current[0]) {
      if (
        scrollRef.current[1] &&
        scrollRef.current[2] &&
        scrollRef.current[1]?.scrollTop + scrollRef.current[1]?.clientHeight <=
          scrollRef.current[2]?.clientHeight
      ) {
        scrollRef.current[2]?.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      } else {
        scrollRef.current[0]?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    } else if (
      scrollRef.current[1] &&
      scrollRef.current[2] &&
      scrollRef.current[1]?.scrollTop + scrollRef.current[1]?.clientHeight <=
        scrollRef.current[2]?.clientHeight
    ) {
      scrollRef.current[2]?.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }, [chatList]);

  return {
    chatList,
    question,
    setQuestion,
    uploadImage,
    setUploadImage,
    isStopedScroll,
    setIsStopedScroll,
    fetchStreamData,
    refHandler,
    wheelHandler,
  };
}
