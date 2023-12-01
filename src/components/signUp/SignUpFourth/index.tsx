import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import Checkboxes from '@/components/common/Checkboxes';
import { PREFER_TRAVEL_STYLE_LIST } from '@/constants/signUp';
import { indexState, preferTravelStyleState } from '@/store/atom/signUpAtom';
import Button from '@/components/common/Button';
import { signUpStateSelector } from '@/store/selector/signUpSelector';
import { postRegisterUserAPI } from '@/services/signUp';
import { ROUTE_PATHS } from '@/constants/config';
import useStatus from '@/hooks/useStatus';
import useAuth from '@/hooks/useAuth';
import { pageState } from '@/store/atom/chatAtom';
import { SignUpTypes } from '@/types/signUp';
import styles from './styles.module.scss';

export default function SignUpFourth() {
  const navigate = useNavigate();
  const page = useRecoilValue(pageState);
  const preferTravelStyle = useRecoilValue(preferTravelStyleState);
  const signUpState = useRecoilValue(signUpStateSelector);
  const setPreferTravelStyle = useSetRecoilState(preferTravelStyleState);
  const setIndex = useSetRecoilState(indexState);
  const setPage = useSetRecoilState(pageState);
  const { getUserInfoByParseToken } = useAuth();
  useStatus('', '');

  const postRegisterUser = async (formData: SignUpTypes) => {
    const response = await postRegisterUserAPI(formData);
    return response;
  };

  const postMutation = useMutation(postRegisterUser, {
    onSuccess: (data) => {
      getUserInfoByParseToken(data?.data.access_token);
      if (page) {
        navigate(page);
        setPage('');
      } else {
        navigate(ROUTE_PATHS.home);
      }
    },
  });

  const submitHandler = async () => {
    postMutation.mutate(signUpState);
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
      <div className={styles.buttonWrapper}>
        <div className={styles.button}>
          <Button
            variant="disabled"
            full={true}
            size="lg"
            onClick={() => setIndex(3)}
            label="이전"
          >
            이전
          </Button>
          {preferTravelStyle?.length === 0 ? (
            <Button
              type="submit"
              variant="disabled"
              full={true}
              size="lg"
              disabled={true}
              label="완료"
            >
              완료
            </Button>
          ) : (
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
          )}
        </div>
      </div>
    </div>
  );
}
