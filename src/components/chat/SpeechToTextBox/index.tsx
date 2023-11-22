import voiceLoading from '@/assets/loading_voice.gif';
import styles from './styles.module.scss';

interface SpeechToTextBoxProps {
  isRecording: boolean;
  isSTTLoading: boolean;
  stopRecording: () => void;
}

export default function SpeechToTextBox({
  isRecording,
  isSTTLoading,
  stopRecording,
}: SpeechToTextBoxProps) {
  return (
    <>
      {isRecording ? (
        <section className={styles.voiceContainer}>
          <div className={styles.voice}>
            듣고 있습니다.
            <div className={styles.pulse} onClick={stopRecording}>
              <span className={styles.stop} />
            </div>
          </div>
        </section>
      ) : (
        isSTTLoading && (
          <section className={styles.voiceContainer}>
            <div className={styles.voice}>
              <img src={voiceLoading} alt="음성인식로딩이미지" />
            </div>
          </section>
        )
      )}
    </>
  );
}
