import React, { SetStateAction } from 'react';
import { API_URLS, BASE_URL } from '@/constants/config';
import remove from '@/assets/remove.png';
import styles from './styles.module.scss';

interface ImagePreviewBoxProps {
  uploadImage: string;
  setUploadImage: React.Dispatch<SetStateAction<string>>;
}

export default function ImagePreviewBox({
  uploadImage,
  setUploadImage,
}: ImagePreviewBoxProps) {
  const cancelHandler = () => {
    setUploadImage('');
  };
  return (
    <>
      {uploadImage && (
        <section className={styles.imageUploadContainer}>
          <div className={styles.imageUpload}>
            {uploadImage && (
              <img src={`${BASE_URL}${API_URLS.viewImage}${uploadImage}`} />
            )}
            <span className={styles.cancel}>
              <img src={remove} onClick={cancelHandler} />
            </span>
          </div>
        </section>
      )}
    </>
  );
}
