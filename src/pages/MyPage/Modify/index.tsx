import { useRecoilValue } from 'recoil';
import { useEffect, useState } from 'react';
import { nameState } from '@/store/atom/signUpAtom';
import { profileImageState } from '@/store/atom/userAtom';
import gildong from '@/assets/gildong_icon.png';
import Header from '@/components/Common/Header';
import useDebounce from '@/hooks/useDebounce';
import { postCheckNickNameAPI } from '@/services/signUp';
import NickName from '@/components/SignUp/NickName';
import Button from '@/components/Common/Button';
import styles from './styles.module.scss';

export default function Modify() {
  const name = useRecoilValue(nameState);
  const [nickName, setNickName] = useState(name);
  const profileImage = useRecoilValue(profileImageState);
  const [nickNameValidation, setNickNameValidation] = useState(false);
  const debouncedInputText = useDebounce(nickName);

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
    setNickName(event.target.value);
  };

  useEffect(() => {
    if (debouncedInputText && debouncedInputText !== name) {
      checkNickName(debouncedInputText);
    }
  }, [debouncedInputText, name]);

  return (
    <>
      <Header>회원 수정</Header>
      <div className={`${styles.pageWrapper} colorLayout`}>
        <div className={styles.profileWrapper}>
          {profileImage !== 'default' ? (
            <img src={profileImage} />
          ) : (
            <img src={gildong} />
          )}
        </div>
        <div>프로필 사진 삭제</div>
        <div>
          <span>닉네임</span>
          <NickName
            value={nickName}
            onChange={nickNameHandler}
            validation={nickNameValidation}
          />
        </div>
        <Button>완료</Button>
      </div>
    </>
  );
}
