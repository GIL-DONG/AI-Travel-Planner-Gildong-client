import { BsFillMicFill } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';
import Button from '@/components/common/Button';
import styles from './styles.module.scss';

interface SendQuestionButtonProps {
  question: string;
  isOpenImage: boolean;
  isRecordingStarting: boolean;
  startRecording: () => void;
  submitHandler: () => void;
}

export default function SendQuestionButton({
  question,
  isOpenImage,
  isRecordingStarting,
  startRecording,
  submitHandler,
}: SendQuestionButtonProps) {
  return (
    <div className={styles.submitWrapper}>
      {question || isOpenImage ? (
        <Button
          size="sm"
          color="white"
          icon={<TbSend />}
          iconBtn={true}
          variant="primary"
          onClick={submitHandler}
        >
          전송
        </Button>
      ) : (
        !isRecordingStarting && (
          <Button
            icon={<BsFillMicFill />}
            size="sm"
            color="secondary"
            iconBtn={true}
            onClick={startRecording}
          >
            녹음 시작
          </Button>
        )
      )}
    </div>
  );
}
