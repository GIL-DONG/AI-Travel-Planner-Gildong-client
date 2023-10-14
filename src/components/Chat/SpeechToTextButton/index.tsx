import axios from 'axios';
import React, { useState, useRef, useEffect } from 'react';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import Button from '@/components/Common/Button';

interface SpeechToTextButtonType {
  isMicOn: boolean;
  setIsMicOn: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function SpeechToTextButton({
  isMicOn,
  setIsMicOn,
  setValue,
}: SpeechToTextButtonType) {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

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
            type: 'audio/wav',
          });
          setAudioBlob(audioBlob);
        };
        mediaRecorderRef.current.start();
        setIsMicOn(true);
      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error);
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
        const currentDate = new Date();
        const fileExtension = 'wav';
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
        const data = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/STT/uploads/`,
          {
            in_files: audioFile,
          },
          {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization:
                `Bearer ${sessionStorage.getItem('access_token')}` || '',
            },
          },
        );
        if (data.data.transcripts[0]) {
          const script = data.data.transcripts[0];
          setValue(
            script.slice(
              script.indexOf(':') + 1,
              script.indexOf('\nConfidence:'),
            ),
          );
        }
      }
    };

    FileUpload();
  }, [audioBlob]);

  return (
    <>
      {isMicOn ? (
        <Button
          size="sm"
          variant="primary"
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
          color="primary"
          iconBtn={true}
          onClick={startRecording}
        >
          녹음 시작
        </Button>
      )}
    </>
  );
}
