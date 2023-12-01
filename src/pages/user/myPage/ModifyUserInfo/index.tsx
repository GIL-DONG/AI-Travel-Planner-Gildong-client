import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoPersonCircleSharp } from 'react-icons/io5';
import { Helmet } from 'react-helmet-async';
import { useMutation } from 'react-query';
import { nameState, userProfileImageState } from '@/store/atom/userAtom';
import useDebounce from '@/hooks/useDebounce';
import { postCheckNickNameAPI } from '@/services/signUp';
import NickName from '@/components/signUp/NickName';
import Button from '@/components/common/Button';
import { patchModifyUserInfoAPI } from '@/services/user';
import { ModifyUserInfoTypes } from '@/types/user';
import { ROUTE_PATHS } from '@/constants/config';
import { nickNameState } from '@/store/atom/signUpAtom';
import useStatus from '@/hooks/useStatus';
import styles from './styles.module.scss';

export default function ModifyUserInfo() {
  const navigate = useNavigate();
  const nickName = useRecoilValue(nickNameState);
  const name = useRecoilValue(nameState);
  const setNickName = useSetRecoilState(nickNameState);
  const setName = useSetRecoilState(nameState);
  const profileImage = useRecoilValue(userProfileImageState);
  const setProfileImage = useSetRecoilState(userProfileImageState);
  const [nickNameValidation, setNickNameValidation] = useState(false);
  const [deleteImage, setDeleteImage] = useState(false);
  const debouncedInputText = useDebounce(nickName);
  useStatus('modifyUserInfo', '회원정보수정');

  const postCheckNickName = async (value: string) => {
    const response = await postCheckNickNameAPI(value);
    if (!value || response?.data.detail === 'Username already exists!') {
      setNickNameValidation(false);
    } else {
      setNickNameValidation(true);
    }
  };

  const patchModifyUserInfo = async (userInfo: ModifyUserInfoTypes) => {
    const response = await patchModifyUserInfoAPI(userInfo);
    return response;
  };

  const postMutation = useMutation(postCheckNickName);
  const patchMutation = useMutation(patchModifyUserInfo, {
    onSuccess: () => {
      setName(nickName);
      setProfileImage('default');
    },
    onSettled: () => {
      navigate(ROUTE_PATHS.myPage);
    },
  });

  const nickNameHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNickName(event.target.value);
  };

  const submitHandler = async () => {
    const userInfo: ModifyUserInfoTypes = {};
    if (nickName && nickNameValidation) {
      userInfo.user_name = nickName;
    }
    if (deleteImage && profileImage !== 'default') {
      userInfo.user_photo = 'default';
    }
    if (userInfo.user_name || userInfo.user_photo) {
      patchMutation.mutate(userInfo);
    }
  };

  useEffect(() => {
    if (debouncedInputText) {
      postMutation.mutate(debouncedInputText);
    }
  }, [debouncedInputText]);

  useEffect(() => {
    setNickName(name);
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Helmet>
        <title>Modify User Information</title>
      </Helmet>
      <div className={styles.content}>
        <div className={styles.profileWrapper}>
          {profileImage !== 'default' && deleteImage === false ? (
            <img src={profileImage} alt="프로필이미지" />
          ) : (
            <IoPersonCircleSharp />
          )}
          {!(profileImage === 'default') && (
            <span
              className={styles.delete}
              onClick={() => setDeleteImage(!deleteImage)}
            >
              프로필 사진 삭제
            </span>
          )}
        </div>
        <div>
          <strong>닉네임</strong>
          <NickName
            value={nickName}
            onChange={nickNameHandler}
            validation={nickNameValidation}
          />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <div className={styles.button}>
          <Button
            variant="disabled"
            full={true}
            size="lg"
            onClick={() => navigate(ROUTE_PATHS.myPage)}
            label="취소"
          >
            취소
          </Button>
          {(nickName && nickNameValidation) ||
          (deleteImage && profileImage !== 'default') ? (
            <Button
              type="submit"
              variant="primary"
              full={true}
              size="lg"
              onClick={submitHandler}
              label="완료"
            >
              완료
            </Button>
          ) : (
            <Button
              variant="disabled"
              full={true}
              size="lg"
              disabled={true}
              label="완료"
            >
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
