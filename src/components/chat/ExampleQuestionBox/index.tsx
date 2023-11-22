import { useNavigate } from 'react-router-dom';
import React, { SetStateAction } from 'react';
import gildong from '@/assets/gildong_3d.png';
import beach from '@/assets/beach.png';
import blindPerson from '@/assets/blind_person.png';
import mountain from '@/assets/mountain.png';
import wheelchair from '@/assets/wheelchair.png';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';
import ExampleQuestion from './ExampleQuesiton';

interface ExampleQuestionBoxProps {
  setUploadImage: React.Dispatch<SetStateAction<string>>;
  fetchStreamData: (text?: string, imageUrl?: string) => void;
}

export default function ExampleQuestionBox({
  setUploadImage,
  fetchStreamData,
}: ExampleQuestionBoxProps) {
  const navigate = useNavigate();

  const clickHandler = (question: string, imageUrl?: string | undefined) => {
    if (imageUrl) {
      setUploadImage(imageUrl);
    }
    fetchStreamData(question, imageUrl);
    navigate(ROUTE_PATHS.mainChat);
  };

  return (
    <section className={styles.container}>
      <img src={gildong} className={styles.image} alt="길동이이미지" />
      <ul className={styles.question}>
        <ExampleQuestion
          clickHandler={clickHandler}
          question="서울 근처에 등산하기 좋은 장소 추천해줄래?"
          src={mountain}
        />
        <ExampleQuestion
          clickHandler={clickHandler}
          question="휠체어를 타시는 부모님과 함께 할 강릉 2박3일 일정 만들어줘!"
          src={wheelchair}
        />
        <ExampleQuestion
          clickHandler={clickHandler}
          question=" 통영에서 시각장애인도 편하게 여행할 수 있는 1박 2일 코스 추천해줄 수 있을까?"
          src={blindPerson}
        />
        <ExampleQuestion
          clickHandler={clickHandler}
          question="내가 보내준 이미지와 비슷한 분위기의 여행지를 알려줄래?"
          imageUrl="20231020003408_바다사진.jpg"
          src={beach}
        />
      </ul>
    </section>
  );
}
