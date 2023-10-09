import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { nameState } from '@/store/atom/signUpAtom';
import { profileImageState } from '@/store/atom/userAtom';
import gildong from '@/assets/gildong_icon.png';
import Header from '@/components/Common/Header';
import useDebounce from '@/hooks/useDebounce';
import { postCheckNickNameAPI } from '@/services/signUp';
import NickName from '@/components/SignUp/NickName';
import Button from '@/components/Common/Button';
import { patchUserAPI } from '@/services/user';
import { updateUserInfoType } from '@/types/user';
import { ROUTE_PATHS } from '@/constants/config';
import styles from './styles.module.scss';

export default function Modify() {
  const navigate = useNavigate();
  const name = useRecoilValue(nameState);
  const setName = useSetRecoilState(nameState);
  const profileImage = useRecoilValue(profileImageState);
  const [nickNameValidation, setNickNameValidation] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
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

  const submitHandler = async () => {
    const obj: updateUserInfoType = {};
    if (name && nickNameValidation) {
      obj.user_name = name;
    }
    if (deleteImage && profileImage !== 'default') {
      obj.user_photo = 'default';
    }
    try {
      if (obj.user_name || obj.user_photo) {
        await patchUserAPI(obj);
      }
    } finally {
      sessionStorage.setItem('name', name);
      sessionStorage.setItem('profile_image', 'default');
      navigate(ROUTE_PATHS.myPage);
    }
  };

  useEffect(() => {
    if (debouncedInputText) {
      checkNickName(debouncedInputText);
    }
  }, [debouncedInputText]);

  return (
    <>
      <Header back={true}>회원 수정</Header>
      <div className={`${styles.pageWrapper} colorLayout`}>
        <div className={styles.content}>
          <div className={styles.profileWrapper}>
            {profileImage !== 'default' && deleteImage === false ? (
              <img src={profileImage} />
            ) : (
              <img src={gildong} />
            )}
            <span
              className={styles.delete}
              onClick={() => setDeleteImage(!deleteImage)}
            >
              프로필 사진 삭제
            </span>
          </div>
          <div>
            <span>닉네임</span>
            <NickName
              value={name}
              onChange={nickNameHandler}
              validation={nickNameValidation}
            />
          </div>
        </div>
        <div className={styles.btn}>
          <Button
            variant="lined"
            color="secondary"
            full={true}
            size="lg"
            onClick={() => navigate(ROUTE_PATHS.myPage)}
          >
            취소
          </Button>
          {(name && nickNameValidation) ||
          (deleteImage && profileImage !== 'default') ? (
            <Button
              type="submit"
              variant="primary"
              full={true}
              size="lg"
              onClick={submitHandler}
            >
              완료
            </Button>
          ) : (
            <Button variant="disabled" full={true} size="lg">
              완료
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
