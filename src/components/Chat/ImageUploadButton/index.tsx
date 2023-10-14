import axios from 'axios';
import { AiOutlineCamera } from 'react-icons/ai';
import { useNavigate } from 'react-router';
import { BASE_URL, ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';
interface DataType {
  in_files: File;
}

export default function ImageUploadButton() {
  const navigate = useNavigate();

  const onClickUploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    navigate(ROUTE_PATHS.chat);
    const imageLists = event.target.files || [];

    const obj: DataType = {
      in_files: imageLists[0],
    };
    const data = await axios.post(`${BASE_URL}/upload_images`, obj, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}` || '',
      },
    });
    console.log(data.data?.fileUrls[0]);
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
