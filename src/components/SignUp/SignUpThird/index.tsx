import { useRecoilValue, useSetRecoilState } from 'recoil';
import SearchBar from '@/components/Common/SearchBar';
import Button from '@/components/Common/Button';
import { indexState, residenceState } from '@/store/atom/signUpAtom';
import styles from './styles.module.scss';
export default function SignUpThird() {
  const residence = useRecoilValue(residenceState);
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
        {residence ? (
          <Button
            variant="primary"
            full={true}
            size="lg"
            onClick={() => setIndex(3)}
          >
            다음
          </Button>
        ) : (
          <Button variant="disabled" full={true} size="lg">
            다음
          </Button>
        )}
      </div>
    </div>
  );
}
