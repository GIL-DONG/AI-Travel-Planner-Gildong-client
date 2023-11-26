import { AiOutlineCamera } from 'react-icons/ai';
import React, { SetStateAction } from 'react';
import { postImageUploadAPI } from '@/services/chat';
import styles from './styles.module.scss';

interface ImageUploadButtonProps {
  setUploadImage: React.Dispatch<SetStateAction<string>>;
}

export default function ImageUploadButton({
  setUploadImage,
}: ImageUploadButtonProps) {
  const onClickUploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files || [];

    if (file.length === 0) {
      return;
    } else {
      const formData = new FormData();
      formData.append('in_files', file[0]);
      try {
        const response = await postImageUploadAPI(formData);
        if (response?.data) {
          const url = response?.data.fileUrls[0];
          setUploadImage(url.slice(url.lastIndexOf('/') + 1));
        }
      } catch (error) {
        setUploadImage('');
        alert('용량이 큽니다');
      }
    }
  };

  return (
    <>
      <label htmlFor="file" className={styles.label}>
        <AiOutlineCamera />
      </label>
      <input
        id="file"
        type="file"
        accept="image/*"
        className={styles.input}
        onInput={onClickUploadImageHandler}
      />
    </>
  );
}
