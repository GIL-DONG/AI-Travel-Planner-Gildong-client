import React, { useState, useRef, useEffect } from 'react';
import { BsFillMicFill, BsFillMicMuteFill } from 'react-icons/bs';
import Button from '@/components/Common/Button';
import { postSTTAPI } from '@/services/chat';

interface SpeechToTextButtonType {
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
            type: 'video/mp4',
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
        const fileExtension = 'mp4';
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
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(audioBlob);
        downloadLink.download = fileName;
        downloadLink.click();
        audioChunks.current = [];
        const formData = new FormData();
        formData.append('in_files', audioFile);
        const data = await postSTTAPI(formData);
        if (data) {
          const script = data.transcripts[0];
          setValue(
            script.slice(
              script.indexOf(':') + 1,
              script.indexOf('\nConfidence:'),
            ),
          );
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
