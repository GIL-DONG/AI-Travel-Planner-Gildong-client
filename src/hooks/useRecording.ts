import { useEffect, useRef, useState } from 'react';
import { postSTTAPI } from '@/services/chat';

interface BrowserTypes {
  settings: {
    browser: {
      name: 'android' | 'ios' | 'chrome' | 'safari' | 'else';
      audioType: 'webm' | 'mp4';
    };
  };
}

export default function useRecording(
  setValue: React.Dispatch<React.SetStateAction<string>>,
) {
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const [state, setState] = useState<BrowserTypes | undefined>();
  const [isRecording, setIsRecording] = useState(false);
  const [isSTTLoading, setIsSTTLoading] = useState(false);
  const [isRecordingStarting, setIsRecordingStarting] = useState(false);

  useEffect(() => {
    if (/Android/i.test(navigator.userAgent)) {
      setState({
        settings: { browser: { name: 'android', audioType: 'webm' } },
      });
    } else if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      setState({
        settings: { browser: { name: 'ios', audioType: 'mp4' } },
      });
    } else if (navigator.userAgent.indexOf('Chrome') > -1) {
      setState({
        settings: { browser: { name: 'chrome', audioType: 'webm' } },
      });
    } else if (navigator.userAgent.indexOf('Safari') > -1) {
      setState({
        settings: { browser: { name: 'safari', audioType: 'mp4' } },
      });
    } else {
      setState({
        settings: { browser: { name: 'else', audioType: 'webm' } },
      });
    }
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
          setIsRecording(false);
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setIsRecordingStarting(true);
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
      setIsRecording(false);
    }
  };

  const FileUpload = async () => {
    if (audioBlob) {
      setIsSTTLoading(true);
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
            script
              .slice(script.indexOf(':') + 1, script.indexOf('\nConfidence:'))
              .trim(),
          );
        }
      } catch {
        (error: any) => console.error(error);
      } finally {
        setIsSTTLoading(false);
        setIsRecordingStarting(false);
      }
    }
  };

  useEffect(() => {
    FileUpload();
  }, [audioBlob]);

  return {
    isRecording,
    isSTTLoading,
    isRecordingStarting,
    startRecording,
    stopRecording,
  };
}
