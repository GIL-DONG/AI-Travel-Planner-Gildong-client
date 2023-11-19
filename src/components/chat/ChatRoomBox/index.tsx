import { API_URLS, BASE_URL } from '@/constants/config';
import RegisterItineraryButton from '@/components/travel/RegisterItineraryButton';
import ChatLoading from '../ChatLoading';
import MarkDown from '../MarkDown';
import styles from './styles.module.scss';

interface ChatRoomBoxProps {
  chatList: ChatTypes[];
  refHandler: (el: HTMLDivElement | null, number: number) => void;
  isStopedScroll: boolean;
}

export default function ChatRoomBox({
  chatList,
  refHandler,
  isStopedScroll,
}: ChatRoomBoxProps) {
  return (
    <section className={styles.chatRoomBackground}>
      <div ref={(el) => refHandler(el, 2)}>
        {chatList?.map((el, index) => (
          <div
            className={styles.question}
            key={index}
            ref={(el) => {
              refHandler(el, 0);
            }}
          >
            {el.image_name && (
              <img
                src={`${BASE_URL}${API_URLS.viewImage}${el.image_name}`}
                className={styles.uploadImage}
              />
            )}
            {el.question}
            <div className={styles.answer}>
              {el.answer === '' ? (
                <ChatLoading />
              ) : (
                <MarkDown text={el.answer} />
              )}
              {el.itinerary_id && (
                <div className={styles.registerItinerary}>
                  <RegisterItineraryButton id={el.itinerary_id} />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {!isStopedScroll && <div className={styles.margin} />}
    </section>
  );
}
