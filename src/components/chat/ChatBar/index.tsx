import React, { SetStateAction } from 'react';
import useRecording from '@/hooks/useRecording';
import ImageUploadButton from '../ImageUploadButton';
import SpeechToTextBox from '../SpeechToTextBox';
import ImagePreviewBox from '../ImagePreviewBox';
import SendQuestionButton from '../SendQuestionButton';
import styles from './styles.module.scss';

interface ChatBarProps {
  question: string;
  uploadImage: string;
  setQuestion: React.Dispatch<SetStateAction<string>>;
  setUploadImage: React.Dispatch<SetStateAction<string>>;
  submitHandler: () => void;
}

export default function ChatBar({
  question,
  uploadImage,
  setUploadImage,
  setQuestion,
  submitHandler,
}: ChatBarProps) {
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
            uploadImage={uploadImage}
            setUploadImage={setUploadImage}
          />
          <SpeechToTextBox
            isRecording={isRecording}
            isSTTLoading={isSTTLoading}
            stopRecording={stopRecording}
          />
          <div className={styles.imageUploadButton}>
            <ImageUploadButton setUploadImage={setUploadImage} />
          </div>
          <input
            id="input"
            className={styles.input}
            onChange={inputHandler}
            value={question}
            onKeyDown={enterHandler}
            placeholder="길동이에게 여행 일정을 맡겨보세요!"
          />
          <SendQuestionButton
            question={question}
            uploadImage={uploadImage}
            isRecordingStarting={isRecordingStarting}
            startRecording={startRecording}
            submitHandler={submitHandler}
          />
        </div>
      </div>
    </section>
  );
}
