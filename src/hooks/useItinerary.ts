import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useMutation, useQuery } from 'react-query';
import { ItineraryScheduleTypes } from '@/types/travel';
import { itineraryIdState } from '@/store/atom/chatAtom';
import { theTopState } from '@/store/atom/travelAtom';
import {
  getItineraryDetailsAPI,
  getPreviousConversationAPI,
  getRegisterItineraryAPI,
} from '@/services/travel';

export default function useItinerary(sessionId?: string | undefined) {
  const itineraryId = useRecoilValue(itineraryIdState);
  const setItineraryId = useSetRecoilState(itineraryIdState);
  const setTheTop = useSetRecoilState(theTopState);

  const getPreviousConversation = async (sessionId: string | undefined) => {
    if (sessionId) {
      const response = await getPreviousConversationAPI(sessionId);
      return response?.data.data.map((el: ItineraryChatTypes) => {
        return {
          question: el.user_message,
          answer: el.formatted_ai_message,
          image_name: el.image_name,
        };
      });
    }
  };

  const { data, isLoading, isError } = useQuery<ChatTypes[]>(
    ['previousConversation'],
    () => getPreviousConversation(sessionId),
  );

  const getRegisterItinerary = async (id: string) => {
    const response = await getRegisterItineraryAPI(id);
    return response.data.message;
  };

  const getItineraryDetails = async (id: string) => {
    const response = await getItineraryDetailsAPI(id);
    return response.data;
  };

  const postMutation = useMutation(getItineraryDetails, {
    onSuccess: (data) => {
      setTheTop({
        title: data.data.title,
        destinations: data.data.schedule.map((el: ItineraryScheduleTypes) => {
          return {
            title: el.title,
            hearing: el.hearing,
            physical: el.physical,
            visual: el.visual,
          };
        }),
      });
      setItineraryId('');
    },
  });

  const patchMutation = useMutation(getRegisterItinerary, {
    onSuccess: (data) => {
      if (data === 'Itinerary registered successfully.')
        postMutation.mutate(itineraryId);
    },
  });

  useEffect(() => {
    if (itineraryId) {
      patchMutation.mutate(itineraryId);
    }
  }, [itineraryId]);

  return { data, isLoading, isError };
}
