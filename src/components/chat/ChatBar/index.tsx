import React, { SetStateAction } from 'react';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '@/constants/config';
import useRecording from '@/hooks/useRecording';
import { pageState } from '@/store/atom/chatAtom';
import ImageUploadButton from '../ImageUploadButton';
import SpeechToTextBox from '../SpeechToTextBox';
import ImagePreviewBox from '../ImagePreviewBox';
import SendQuestionButton from '../SendQuestionButton';
import styles from './styles.module.scss';

interface ChatBarProps {
  question: string;
  isOpenImage: boolean;
  setQuestion: React.Dispatch<SetStateAction<string>>;
  setIsOpenImage: React.Dispatch<SetStateAction<boolean>>;
  fetchStreamData: (text?: string, imageUrl?: string) => void;
}

export default function ChatBar({
  question,
  setQuestion,
  isOpenImage,
  setIsOpenImage,
  fetchStreamData,
}: ChatBarProps) {
  const navigate = useNavigate();
  const setPage = useSetRecoilState(pageState);
  const {
    isRecording,
    isSTTLoading,
    isRecordingStarting,
    startRecording,
    stopRecording,
  } = useRecording(setQuestion);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const submitHandler = async () => {
    setPage(ROUTE_PATHS.mainChat);
    setIsOpenImage(false);
    navigate(ROUTE_PATHS.mainChat);
    await fetchStreamData();
  };

  const enterHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submitHandler();
    }
  };

  return (
    <section className={styles.chatContainer}>
      <div className={styles.chatWrapper}>
        <div className={styles.chat}>
          <ImagePreviewBox
            isOpenImage={isOpenImage}
            setIsOpenImage={setIsOpenImage}
          />
          <SpeechToTextBox
            isRecording={isRecording}
            isSTTLoading={isSTTLoading}
            stopRecording={stopRecording}
          />
          <div className={styles.imageUploadButton}>
            <ImageUploadButton setIsImageOpen={setIsOpenImage} />
          </div>
          <input
            className={styles.input}
            onChange={inputHandler}
            value={question}
            onKeyDown={enterHandler}
            placeholder="무엇이든 물어보세요!"
          />
          <SendQuestionButton
            question={question}
            isOpenImage={isOpenImage}
            isRecordingStarting={isRecordingStarting}
            startRecording={startRecording}
            submitHandler={submitHandler}
          />
        </div>
      </div>
    </section>
  );
}
