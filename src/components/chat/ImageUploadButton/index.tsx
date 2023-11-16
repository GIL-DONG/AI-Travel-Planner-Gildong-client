import { AiOutlineCamera } from 'react-icons/ai';
import { useSetRecoilState } from 'recoil';
import React, { SetStateAction } from 'react';
import { imageState } from '@/store/atom/travelAtom';
import { postImageUploadAPI } from '@/services/chat';
import styles from './styles.module.scss';

interface ImageUploadButtonProps {
  setIsImageOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function ImageUploadButton({
  setIsImageOpen,
}: ImageUploadButtonProps) {
  const setImage = useSetRecoilState(imageState);

  const onClickUploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files || [];

    if (file.length === 0) {
      return;
    } else {
      setIsImageOpen(true);
      const formData = new FormData();
      formData.append('in_files', file[0]);
      try {
        const data = await postImageUploadAPI(formData);
        if (data) {
          const url = data.fileUrls[0];
          setImage(url.slice(url.lastIndexOf('/') + 1));
        }
      } catch (error) {
        setIsImageOpen(false);
        setImage('');
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
