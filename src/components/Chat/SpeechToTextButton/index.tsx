import React, { useState, useRef, useEffect } from 'react';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import Button from '@/components/Common/Button';
import { postSTTAPI } from '@/services/chat';

interface StateTypes {
  settings: {
    browser: {
      name: 'android' | 'ios' | 'chrome' | 'safari';
      audioType: 'webm' | 'mp4';
    };
  };
}
interface SpeechToTextButtonProps {
  isMicOn: boolean;
  setIsMicOn: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setIsMicLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SpeechToTextButton({
  isMicOn,
  setIsMicOn,
  setValue,
  setIsMicLoading,
}: SpeechToTextButtonProps) {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [state, setState] = useState<StateTypes | undefined>();

  useEffect(() => {
    if (/Android/i.test(navigator.userAgent)) {
      setState({
        ...state,
        settings: { browser: { name: 'android', audioType: 'webm' } },
      });
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      setState({
        ...state,
        settings: { browser: { name: 'ios', audioType: 'mp4' } },
      });
    } else if (navigator.userAgent.indexOf('Chrome') > -1) {
      setState({
        ...state,
        settings: { browser: { name: 'chrome', audioType: 'webm' } },
      });
    } else if (navigator.userAgent.indexOf('Safari') > -1) {
      setState({
        ...state,
        settings: { browser: { name: 'safari', audioType: 'mp4' } },
      });
    }
    console.log(state);
  }, []);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunks.current.push(event.data);
          }
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunks.current, {
            type: `audio/${state?.settings.browser.audioType}`,
          });
          setAudioBlob(audioBlob);
          setIsMicOn(false);
        };
        mediaRecorderRef.current.start();
        setIsMicOn(true);
      })
      .catch((error) => {
        alert(error);
      });
  };

  function blobToFile(blob: Blob, fileName: string): File {
    const file = new File([blob], fileName);
    return file;
  }

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop();
      setIsMicOn(false);
    }
  };

  useEffect(() => {
    const FileUpload = async () => {
      if (audioBlob) {
        setIsMicLoading(true);
        const currentDate = new Date();
        const fileExtension = state?.settings.browser.audioType;
        const formattedDate = `${currentDate.getFullYear()}_${(
          currentDate.getMonth() + 1
        )
          .toString()
          .padStart(2, '0')}_${currentDate
          .getDate()
          .toString()
          .padStart(2, '0')}`;
        const formattedTime = `${currentDate
          .getHours()
          .toString()
          .padStart(2, '0')}_${currentDate
          .getMinutes()
          .toString()
          .padStart(2, '0')}_${currentDate
          .getSeconds()
          .toString()
          .padStart(2, '0')}`;
        const fileName = `audio_${formattedDate}_${formattedTime}.${fileExtension}`;
        const audioFile = blobToFile(audioBlob, fileName);
        audioChunks.current = [];
        const formData = new FormData();
        formData.append('in_files', audioFile);
        const data = await postSTTAPI(formData);
        try {
          if (data) {
            const script = data.transcripts[0];
            setValue(
              script.slice(
                script.indexOf(':') + 1,
                script.indexOf('\nConfidence:'),
              ),
            );
          }
        } catch {
          (error: any) => console.error(error);
        }
        setIsMicLoading(false);
      }
    };

    FileUpload();
  }, [audioBlob]);

  return (
    <>
      {isMicOn ? (
        <Button
          size="sm"
          variant="record"
          icon={<BsFillMicMuteFill />}
          iconBtn={true}
          onClick={stopRecording}
        >
          녹음 중지
        </Button>
      ) : (
        <Button
          icon={<BsFillMicFill />}
          size="sm"
          variant="lined"
          color="secondary"
          iconBtn={true}
          onClick={startRecording}
        >
          녹음 시작
        </Button>
      )}
    </>
  );
}
