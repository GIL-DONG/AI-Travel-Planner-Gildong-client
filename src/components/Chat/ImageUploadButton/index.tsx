import axios from 'axios';
import { AiOutlineCamera } from 'react-icons/ai';
import styles from './styles.module.scss';
interface DataType {
  body: string;
  in_files: File;
}

export default function ImageUploadButton() {
  const onClickUploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const imageLists = event.target.files || [];

    const obj: DataType = {
      body: '비슷한 명소',
      in_files: imageLists[0],
    };
    const data = await axios.post(
      `${import.meta.env.VITE_APP_API_URL}/upload-images/`,
      obj,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('access_token')}` || '',
        },
      },
    );
    console.log(data.data?.fileUrls[0]);
  };

  return (
    <>
      <label htmlFor="file" className={styles.label}>
        <AiOutlineCamera />
        사진 첨부
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
