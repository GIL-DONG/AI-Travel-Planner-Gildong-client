import { useRecoilValue, useSetRecoilState } from 'recoil';
import React, { SetStateAction } from 'react';
import { API_URLS, BASE_URL } from '@/constants/config';
import remove from '@/assets/remove.png';
import { imageState } from '@/store/atom/travelAtom';
import styles from './styles.module.scss';

interface ImagePreviewBoxProps {
  isOpenImage: boolean;
  setIsOpenImage: React.Dispatch<SetStateAction<boolean>>;
}

export default function ImagePreviewBox({
  isOpenImage,
  setIsOpenImage,
}: ImagePreviewBoxProps) {
  const image = useRecoilValue(imageState);
  const setImage = useSetRecoilState(imageState);

  const cancelHandler = () => {
    setImage('');
    setIsOpenImage(false);
  };
  return (
    <>
      {isOpenImage && (
        <section className={styles.imageUploadContainer}>
          <div className={styles.imageUpload}>
            {image && <img src={`${BASE_URL}${API_URLS.viewImage}${image}`} />}
            <span className={styles.cancel}>
              <img src={remove} onClick={cancelHandler} />
            </span>
          </div>
        </section>
      )}
    </>
  );
}
