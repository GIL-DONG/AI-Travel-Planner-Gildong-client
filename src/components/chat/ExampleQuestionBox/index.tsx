import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import gildong from '@/assets/gildong_3d.png';
import beach from '@/assets/beach.png';
import blindPerson from '@/assets/blind_person.png';
import mountain from '@/assets/mountain.png';
import wheelchair from '@/assets/wheelchair.png';
import { imageState } from '@/store/atom/travelAtom';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';
import ExampleQuestion from './ExampleQuesiton';

interface ExampleQuestionBoxProps {
  fetchStreamData: (text?: string, imageUrl?: string) => void;
}

export default function ExampleQuestionBox({
  fetchStreamData,
}: ExampleQuestionBoxProps) {
  const navigate = useNavigate();
  const setImage = useSetRecoilState(imageState);

  const clickHandler = (question: string, imageUrl?: string | undefined) => {
    if (imageUrl) {
      setImage(imageUrl);
    }
    fetchStreamData(question, imageUrl);
    navigate(ROUTE_PATHS.mainChat);
  };

  return (
    <section className={styles.container}>
      <span className={styles.title}>길동이에게 여행 일정을 맡겨보세요!</span>
      <img src={gildong} className={styles.image} />
      <ul className={styles.question}>
        <ExampleQuestion
          clickHandler={clickHandler}
          question="서울 근처에 등산하기 좋은 장소 추천해줄래?"
          src={mountain}
        />
        <ExampleQuestion
          clickHandler={clickHandler}
          question="부산에서 휠체어 이용이 편리한 2박 3일 여행코스를 알려줄래?"
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
