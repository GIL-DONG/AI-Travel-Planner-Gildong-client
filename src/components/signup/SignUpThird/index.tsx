import { useSetRecoilState } from 'recoil';
import SearchBar from '@/components/common/SearchBar';
import Button from '@/components/common/Button';
import { indexState } from '@/store/atom/signUpAtom';
import styles from './styles.module.scss';
export default function SignUpThird() {
  const setIndex = useSetRecoilState(indexState);

  return (
    <div className={styles.container}>
      <div>
        <SearchBar />
      </div>
      <div className={styles.btn}>
        <Button
          variant="lined"
          color="primary"
          full={true}
          size="lg"
          onClick={() => setIndex(1)}
        >
          이전
        </Button>
        <Button
          variant="primary"
          full={true}
          size="lg"
          onClick={() => setIndex(3)}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
