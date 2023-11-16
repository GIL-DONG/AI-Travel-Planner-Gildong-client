import { useRecoilValue } from 'recoil';
import FormTemplate from '@/components/SignUp/FormTemplate';
import SignUpFirst from '@/components/SignUp/SignUpFirst';
import SignUpSecond from '@/components/SignUp/SignUpSecond';
import SignUpThird from '@/components/SignUp/SignUpThird';
import SignUpFourth from '@/components/SignUp/SignUpFourth';
import { indexState } from '@/store/atom/signUpAtom';
import ConsentInfo from '@/components/SignUp/ConsentInfo';
import styles from './styles.module.scss';

const list = [
  {
    page: 'first',
    title: '길동이 개인정보 수집 동의',
    chidren: <ConsentInfo />,
  },
  {
    page: 'second',
    title: '안녕하세요. 환영합니다!',
    text: '몇가지 정보를 입력해주시면 여행지를 추천해드릴 수 있어요.',
    chidren: <SignUpFirst />,
  },
  {
    page: 'third',
    title: '장애를 가지고 계신가요?',
    text: '장애를 고려해서 여행지를 추천해드릴게요!',
    chidren: <SignUpSecond />,
  },
  {
    page: 'fourth',
    title: '주로 어디서 출발하시나요?',
    text: '원하는 목적지가 없을 경우, 출발지 주변으로 여행지를 추천해드릴게요!',
    chidren: <SignUpThird />,
  },
  {
    page: 'fifth',
    title: '어떤 여행을 선호하시나요?',
    text: '선호하시는 여행스타일로 여행지를 추천해드릴게요!',
    chidren: <SignUpFourth />,
  },
];

export default function SignUp() {
  const index = useRecoilValue(indexState);

  return (
    <div className={styles.pageWrapper}>
      <FormTemplate
        page={list[index].page}
        title={list[index].title}
        text={list[index].text}
      >
        {list[index].chidren}
      </FormTemplate>
    </div>
  );
}
