import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import RadioButtonGroup from '@/components/common/RadioButtonGroup';
import {
  ageGroupState,
  genderState,
  indexState,
  nickNameState,
} from '@/store/atom/signUpAtom';
import { AGEGROUP_LIST, GENDER_LIST } from '@/constants/signUp';
import { postCheckNickNameAPI } from '@/services/signUp';
import Button from '@/components/common/Button';
import useDebounce from '@/hooks/useDebounce';
import useStatus from '@/hooks/useStatus';
import InputTemplate from '../InputTemplate';
import NickName from '../NickName';
import styles from './styles.module.scss';

export default function SignUpFirst() {
  const nickName = useRecoilValue(nickNameState);
  const gender = useRecoilValue(genderState);
  const ageGroup = useRecoilValue(ageGroupState);
  const setNickName = useSetRecoilState(nickNameState);
  const setGender = useSetRecoilState(genderState);
  const setAgeGroup = useSetRecoilState(ageGroupState);
  const [nickNameValidation, setNickNameValidation] = useState(false);
  const setIndex = useSetRecoilState(indexState);
  const debouncedInputText = useDebounce(nickName);
  useStatus('', '');

  const checkNickName = async (value: string) => {
    const response = await postCheckNickNameAPI(value);
    return { response, value };
  };

  const postMutation = useMutation(checkNickName, {
    onSuccess: (data) => {
      if (
        !data.value ||
        data.response?.data.detail === 'Username already exists!'
      ) {
        setNickNameValidation(false);
      } else {
        setNickNameValidation(true);
      }
    },
  });

  const nickNameHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNickName(event.target.value);
  };

  useEffect(() => {
    if (debouncedInputText) {
      postMutation.mutate(debouncedInputText);
    }
  }, [debouncedInputText]);

  return (
    <div className={styles.container}>
      <div>
        <InputTemplate htmlFor="name" name="닉네임">
          <NickName
            value={nickName}
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
          <Button
            variant="disabled"
            full={true}
            size="lg"
            onClick={() => setIndex(0)}
            label="이전"
          >
            이전
          </Button>
          {nickNameValidation && gender && ageGroup ? (
            <Button
              variant="primary"
              full={true}
              size="lg"
              onClick={() => setIndex(2)}
              label="다음"
            >
              다음
            </Button>
          ) : (
            <Button
              variant="disabled"
              full={true}
              size="lg"
              disabled={true}
              label="다음"
            >
              다음
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
