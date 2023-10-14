import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import RadioButtonGroup from '@/components/Common/RadioButtonGroup';
import {
  ageGroupState,
  genderState,
  indexState,
  nameState,
} from '@/store/atom/signUpAtom';
import { AGEGROUP_LIST, GENDER_LIST } from '@/constants/signUp';
import { postCheckNickNameAPI } from '@/services/signUp';
import Button from '@/components/Common/Button';
import useDebounce from '@/hooks/useDebounce';
import InputTemplate from '../InputTemplate';
import NickName from '../NickName';
import styles from './styles.module.scss';

export default function SignUpFirst() {
  const name = useRecoilValue(nameState);
  const gender = useRecoilValue(genderState);
  const ageGroup = useRecoilValue(ageGroupState);
  const setName = useSetRecoilState(nameState);
  const setGender = useSetRecoilState(genderState);
  const setAgeGroup = useSetRecoilState(ageGroupState);
  const [nickNameValidation, setNickNameValidation] = useState(false);
  const setIndex = useSetRecoilState(indexState);
  const debouncedInputText = useDebounce(name);

  const checkNickName = async (value: string) => {
    const data = await postCheckNickNameAPI(value);
    if (!value || data.detail === 'Username already exists!') {
      setNickNameValidation(false);
    } else {
      setNickNameValidation(true);
    }
  };

  const nickNameHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setName(event.target.value);
  };

  useEffect(() => {
    if (debouncedInputText) {
      checkNickName(debouncedInputText);
    }
  }, [debouncedInputText]);

  return (
    <div className={styles.container}>
      <div>
        <InputTemplate htmlFor="name" name="닉네임">
          <NickName
            value={name}
            onChange={nickNameHandler}
            validation={nickNameValidation}
          />
        </InputTemplate>
        <InputTemplate id="sex" name="성별">
          <RadioButtonGroup
            setRadioButtonItem={setGender}
            radioButtonlist={GENDER_LIST}
            radioButtonItem={gender}
            label="gender"
          />
        </InputTemplate>
        <InputTemplate id="age" name="나이">
          <RadioButtonGroup
            setRadioButtonItem={setAgeGroup}
            radioButtonlist={AGEGROUP_LIST}
            radioButtonItem={ageGroup}
            label="age"
          />
        </InputTemplate>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.button}>
          {nickNameValidation && gender && ageGroup ? (
            <Button
              variant="primary"
              full={true}
              size="lg"
              onClick={() => setIndex(1)}
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
    </div>
  );
}
