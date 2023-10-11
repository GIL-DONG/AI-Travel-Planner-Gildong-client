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
