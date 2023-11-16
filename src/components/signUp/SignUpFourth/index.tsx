import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import Checkboxes from '@/components/common/Checkboxes';
import { PREFER_TRAVEL_STYLE_LIST } from '@/constants/signUp';
import { indexState, preferTravelStyleState } from '@/store/atom/signUpAtom';
import Button from '@/components/common/Button';
import { signUpStateSelector } from '@/store/selector/signUpSelector';
import { postRegisterUserAPI } from '@/services/signUp';
import { isLoginState } from '@/store/atom/userAtom';
import { ROUTE_PATHS } from '@/constants/config';
import useStatus from '@/hooks/useStatus';
import styles from './styles.module.scss';

export default function SignUpFourth() {
  const navigate = useNavigate();
  const preferTravelStyle = useRecoilValue(preferTravelStyleState);
  const signUpState = useRecoilValue(signUpStateSelector);
  const setPreferTravelStyle = useSetRecoilState(preferTravelStyleState);
  const setIndex = useSetRecoilState(indexState);
  const setIsLogin = useSetRecoilState(isLoginState);
  useStatus('', '');

  const submitHandler = async () => {
    const data = await postRegisterUserAPI(signUpState);
    if (data) {
      localStorage.setItem('access_token', data.access_token);
      setIsLogin(true);
      navigate(ROUTE_PATHS.home);
    }
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
            variant="lined"
            color="primary"
            full={true}
            size="lg"
            onClick={() => setIndex(3)}
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
            >
              완료
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
