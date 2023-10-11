import axios from 'axios';
import { useState, useRef } from 'react';

export default function SpeechToTextButton() {
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
      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error);
      });
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === 'recording'
    ) {
      mediaRecorderRef.current.stop();
    }
  };

  function blobToFile(blob: Blob, fileName: string): File {
    const file = new File([blob], fileName);
    return file;
  }
  const date = new Date();
  console.log(date);
  const handleFileUpload = async () => {
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
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(audioBlob);
      downloadLink.download = fileName;
      downloadLink.click();
      audioChunks.current = [];
      const data = await axios.post(
        'http://211.169.248.182:5042/STT/uploads/',
        {
          in_files: audioFile,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      console.log(data);
    }
  };

  return (
    <div>
      <h1>오디오 녹음</h1>
      <button onClick={startRecording}>녹음 시작</button>
      <button onClick={stopRecording}>녹음 중지</button>
      <button onClick={handleFileUpload}>녹음된 파일 업로드</button>
    </div>
  );
}
