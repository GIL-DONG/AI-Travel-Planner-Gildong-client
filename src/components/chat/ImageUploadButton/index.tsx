import { AiOutlineCamera } from 'react-icons/ai';
import React, { SetStateAction } from 'react';
import { useMutation } from 'react-query';
import { postImageUploadAPI } from '@/services/chat';
import styles from './styles.module.scss';

interface ImageUploadButtonProps {
  setUploadImage: React.Dispatch<SetStateAction<string>>;
}

export default function ImageUploadButton({
  setUploadImage,
}: ImageUploadButtonProps) {
  const postImageUpload = async (formData: FormData) => {
    const response = await postImageUploadAPI(formData);
    return response;
  };

  const postMutation = useMutation(postImageUpload, {
    onSuccess: (data) => {
      const url = data.data.fileUrls[0];
      setUploadImage(url.slice(url.lastIndexOf('/') + 1));
    },
    onError: () => {
      setUploadImage('');
      alert('용량이 큽니다');
    },
  });

  const onClickUploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files || [];

    if (file.length === 0) {
      return;
    } else {
      const formData = new FormData();
      formData.append('in_files', file[0]);
      postMutation.mutate(formData);
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
