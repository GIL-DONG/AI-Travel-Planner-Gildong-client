import axios from 'axios';
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
    console.log(imageLists[0]);
    const obj: DataType = {
      body: '비슷한 명소',
      in_files: imageLists[0],
    };
    const data = await axios.post(
      'http://211.169.248.182:5042/upload-images/',
      obj,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    console.log(data.data?.fileUrls[0]);
    // if (data.data?.fileUrls[0]) {
    //   const res = await axios.get(
    //     `http://211.169.248.182:5042/search-image/${data.data?.fileUrls[0]}`,
    //   );
    //   console.log(res);
    // }
  };

  return (
    <>
      <div>
        <label htmlFor="file" className={styles.label}>
          사진첨부하기
        </label>
      </div>
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
