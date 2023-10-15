import axios from 'axios';
import { AiOutlineCamera } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import React, { SetStateAction } from 'react';
import { BASE_URL, ROUTE_PATHS } from '@/constants/config';
import { imageState, uploadImageState } from '@/store/atom/travelAtom';
import styles from './styles.module.scss';
interface DataTypes {
  in_files: File;
}

interface ImageUploadButtonProps {
  setIsImageOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function ImageUploadButton({
  setIsImageOpen,
}: ImageUploadButtonProps) {
  const navigate = useNavigate();
  const setImage = useSetRecoilState(imageState);
  const setUploadImage = useSetRecoilState(uploadImageState);

  const onClickUploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    navigate(ROUTE_PATHS.chat);
    const file = event.target.files || [];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageDataUrl = e.target?.result;
        setUploadImage(imageDataUrl as string);
      };
      reader.readAsDataURL(file[0]);
      setIsImageOpen(true);
    }

    const obj: DataTypes = {
      in_files: file[0],
    };
    const data = await axios.post(`${BASE_URL}/upload-images`, obj, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}` || '',
      },
    });
    const url = data.data.fileUrls[0];
    setImage(url.slice(url.lastIndexOf('/') + 1));
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
