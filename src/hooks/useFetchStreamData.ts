import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { imageState } from '@/store/atom/travelAtom';
import { mainChatListState, sessionIdState } from '@/store/atom/chatAtom';
import { API_URLS, BASE_URL } from '@/constants/config';

export default function useFetchStreamData() {
  const image = useRecoilValue(imageState);
  const setImage = useSetRecoilState(imageState);
  const sessionId = useRecoilValue(sessionIdState);
  const setSessionId = useSetRecoilState(sessionIdState);
  const chatList = useRecoilValue(mainChatListState);
  const setChatList = useSetRecoilState(mainChatListState);
  const [question, setQuestion] = useState('');
  const [isStopedScroll, setIsStopedScroll] = useState(false);
  const [isOpenImage, setIsOpenImage] = useState(false);

  const postQuestionAPI = async (inputText?: string, imageUrl?: string) => {
    return await fetch(`${BASE_URL}${API_URLS.mainChat}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('access_token')
          ? `Bearer ${localStorage.getItem('access_token')}`
          : '',
      },
      body: JSON.stringify({
        session_id: sessionId,
        question: question || inputText || '',
        image_name: imageUrl || image || '',
      }),
    });
  };

  const fetchStreamData = async (inputText?: string, imageUrl?: string) => {
    try {
      setIsStopedScroll(false);
      setIsOpenImage(false);
      setChatList([
        ...chatList,
        {
          question: question || inputText || '',
          answer: '',
          itinerary_id: '',
          image_name: imageUrl || image || '',
        },
      ]);
      setQuestion('');
      const response = await postQuestionAPI(inputText, imageUrl);
      const reader =
        response.body?.pipeThrough(new TextDecoderStream()).getReader() ??
        false;
      let str = '';
      let itineraryId = '';
      if (reader) {
        for (;;) {
          const { value, done } = await reader.read();

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
                str += data.message;

                setChatList((prevChatList) => [
                  ...prevChatList.slice(0, prevChatList.length - 1),
                  {
                    question: question || inputText || '',
                    answer: str,
                    itinerary_id: itineraryId,
                    image_name: imageUrl || image || '',
                  },
                ]);
              }
            }
          }
        }
      }
      setImage('');
    } catch (error) {
      console.error(error);
    }
  };

  return {
    chatList,
    question,
    setQuestion,
    isStopedScroll,
    setIsStopedScroll,
    isOpenImage,
    setIsOpenImage,
    fetchStreamData,
  };
}
