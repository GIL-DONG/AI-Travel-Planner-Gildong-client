declare interface ChatQuestionTypes {
  session_id: string;
  question: string;
}

declare interface ChatAnswerTypes {
  message: string | object;
  session_id: string;
  itinerary_id: string;
}
