import { useRecoilValue, useSetRecoilState } from 'recoil';
import RadioButtonGroup from '@/components/Common/RadioButtonGroup';
import Select from '@/components/Common/Select';
import {
  DISABILITY_STATUS_LIST,
  DISABILITY_TYPE_LIST,
} from '@/constants/signUp';
import {
  disabilityStatusState,
  disabilityTypeState,
  indexState,
} from '@/store/atom/signUpAtom';
import Button from '@/components/Common/Button';
import InputTemplate from '../InputTemplate';
import styles from './styles.module.scss';

export default function SignUpSecond() {
  const disabilityStatus = useRecoilValue(disabilityStatusState);
  const disabilityType = useRecoilValue(disabilityTypeState);
  const setDisabilityStatus = useSetRecoilState(disabilityStatusState);
  const setDisabilityType = useSetRecoilState(disabilityTypeState);
  const setIndex = useSetRecoilState(indexState);

  return (
    <div className={styles.container}>
      <div>
        <InputTemplate id="barrier" name="장애여부">
          <RadioButtonGroup
            label="barrier"
            setRadioButtonItem={setDisabilityStatus}
            radioButtonItem={disabilityStatus}
            radioButtonlist={DISABILITY_STATUS_LIST}
          />
        </InputTemplate>
        {disabilityStatus === '예' ? (
          <InputTemplate id="barrierType" name="장애종류">
            <Select
              label="name"
              selectList={DISABILITY_TYPE_LIST}
              selectedItem={disabilityType}
              setSelectedItem={setDisabilityType}
            />
          </InputTemplate>
        ) : null}
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.button}>
          <Button
            variant="lined"
            color="primary"
            full={true}
            size="lg"
            onClick={() => setIndex(1)}
          >
            이전
          </Button>
          {disabilityStatus === '아니오' ||
          (disabilityStatus === '예' && disabilityType) ? (
            <Button
              variant="primary"
              full={true}
              size="lg"
              onClick={() => setIndex(3)}
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
