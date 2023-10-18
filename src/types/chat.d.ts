declare interface ChatQuestionTypes {
  session_id: string;
  question: string;
}

declare interface ChatAnswerTypes {
  message: string | object;
  session_id: string;
  itinerary_id?: string;
}
declare interface ChatTypes {
  question: string;
  answer: string;
  itinerary_id?: string;
  image_name?: string;
}

declare interface ItineraryChatTypes {
  formatted_ai_message: string;
  timestamp: string;
  turn_id: number;
  user_message: string;
}
