import { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { ItineraryScheduleTypes } from '@/types/travel';
import { itineraryIdState } from '@/store/atom/chatAtom';
import { theTopState } from '@/store/atom/travelAtom';
import {
  getItineraryDetailsAPI,
  getPrevioustConversationAPI,
  getRegisterItineraryAPI,
} from '@/services/travel';

export default function useItinerary(sessionId?: string | undefined) {
  const itineraryId = useRecoilValue(itineraryIdState);
  const setItineraryId = useSetRecoilState(itineraryIdState);
  const setTheTop = useSetRecoilState(theTopState);
  const [isLoading, setIsLoading] = useState(false);
  const [itineraryChatList, setItineraryChatList] = useState<ChatTypes[]>([]);

  const getPreviousConversation = async (sessionId: string) => {
    setIsLoading(true);
    const data = await getPrevioustConversationAPI(sessionId);
    if (data) {
      const chatList = data.data.map((el: ItineraryChatTypes) => {
        return {
          question: el.user_message,
          answer: el.formatted_ai_message,
          image_name: el.image_name,
        };
      });
      setItineraryChatList(chatList);
      setIsLoading(false);
    }
  };

  const getUpdateItinerary = async () => {
    const data = await getRegisterItineraryAPI(itineraryId);
    if (data.message === 'Itinerary registered successfully.') {
      const response = await getItineraryDetailsAPI(itineraryId);
      if (response) {
        setTheTop({
          title: response.data?.title,
          destinations: response.data?.schedule.map(
            (el: ItineraryScheduleTypes) => {
              return { title: el.title };
            },
          ),
        });
        setItineraryId('');
      }
    }
  };

  useEffect(() => {
    if (sessionId) {
      getPreviousConversation(sessionId);
    }
  }, []);

  useEffect(() => {
    if (itineraryId) {
      getUpdateItinerary();
    }
  }, [itineraryId]);

  return { isLoading, itineraryChatList, setItineraryChatList };
}
