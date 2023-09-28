import { useRecoilValue, useSetRecoilState } from 'recoil';
import RadioButtonGroup from '@/components/common/RadioButtonGroup';
import Select from '@/components/common/Select';
import {
  DISABILITY_STATUS_LIST,
  DISABILITY_TYPE_LIST,
} from '@/constants/signUp';
import {
  disabilityStatusState,
  disabilityTypeState,
  indexState,
} from '@/store/atom/signUpAtom';
import Button from '@/components/common/Button';
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
      <div className={styles.btn}>
        <Button
          variant="lined"
          color="primary"
          full={true}
          size="lg"
          onClick={() => setIndex(0)}
        >
          이전
        </Button>
        {disabilityStatus === '아니오' ||
        (disabilityStatus === '예' && disabilityType) ? (
          <Button
            variant="primary"
            full={true}
            size="lg"
            onClick={() => setIndex(2)}
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
