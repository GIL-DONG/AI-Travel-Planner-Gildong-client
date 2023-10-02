import { useRecoilValue, useSetRecoilState } from 'recoil';
import Checkboxes from '@/components/Common/Checkboxes';
import { PREFER_TRAVEL_STYLE_LIST } from '@/constants/signUp';
import { indexState, preferTravelStyleState } from '@/store/atom/signUpAtom';
import Button from '@/components/Common/Button';
import { signUpStateSelector } from '@/store/selector/signUpSelector';
import styles from './styles.module.scss';

export default function SignUpFourth() {
  const preferTravelStyle = useRecoilValue(preferTravelStyleState);
  const signUpState = useRecoilValue(signUpStateSelector);
  const setPreferTravelStyle = useSetRecoilState(preferTravelStyleState);
  const setIndex = useSetRecoilState(indexState);

  const submitHandler = () => {
    console.log(signUpState);
  };

  return (
    <div className={styles.container}>
      <div>
        <Checkboxes
          label="travel"
          checkBoxList={PREFER_TRAVEL_STYLE_LIST}
          checkedList={preferTravelStyle}
          setCheckedList={setPreferTravelStyle}
        />
      </div>
      <div className={styles.btn}>
        <Button
          variant="lined"
          color="primary"
          full={true}
          size="lg"
          onClick={() => setIndex(2)}
        >
          이전
        </Button>
        {preferTravelStyle?.length === 0 ? (
          <Button type="submit" variant="disabled" full={true} size="lg">
            완료
          </Button>
        ) : (
          <Button
            type="submit"
            variant="primary"
            full={true}
            size="lg"
            onClick={submitHandler}
          >
            완료
          </Button>
        )}
      </div>
    </div>
  );
}
