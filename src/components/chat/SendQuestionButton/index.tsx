import { BsFillMicFill } from 'react-icons/bs';
import { TbSend } from 'react-icons/tb';
import Button from '@/components/common/Button';
import styles from './styles.module.scss';

interface SendQuestionButtonProps {
  question: string;
  uploadImage: string;
  isRecordingStarting: boolean;
  startRecording: () => void;
  submitHandler: () => void;
}

export default function SendQuestionButton({
  question,
  uploadImage,
  isRecordingStarting,
  startRecording,
  submitHandler,
}: SendQuestionButtonProps) {
  return (
    <div className={styles.submitWrapper}>
      {question || uploadImage ? (
        <Button
          size="sm"
          color="white"
          icon={<TbSend />}
          iconBtn={true}
          variant="primary"
          onClick={submitHandler}
          label="전송"
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
            label="녹음 시작"
          >
            녹음 시작
          </Button>
        )
      )}
    </div>
  );
}
