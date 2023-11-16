import { useRecoilValue, useSetRecoilState } from 'recoil';
import SearchBar from '@/components/signUp/SearchBar';
import Button from '@/components/common/Button';
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
      <div className={styles.buttonWrapper}>
        <div className={styles.button}>
          <Button
            variant="lined"
            color="primary"
            full={true}
            size="lg"
            onClick={() => setIndex(2)}
          >
            이전
          </Button>
          {residence ? (
            <Button
              variant="primary"
              full={true}
              size="lg"
              onClick={() => setIndex(4)}
            >
              다음
            </Button>
          ) : (
            <Button variant="disabled" full={true} size="lg" disabled={true}>
              다음
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
