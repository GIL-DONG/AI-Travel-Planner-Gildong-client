import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import gildong from '@/assets/gildong_3d_bg.png';
import kakao from '@/assets/kakao.png';
import { JAVASCRIPT_KEY, REDIRECT_URL } from '@/constants/auth';
import Header from '@/components/Common/Header';
import Button from '@/components/Common/Button';
import { getTestIdAPI } from '@/services/auth';
import parseToken from '@/utils/parseToken';
import { ROUTE_PATHS } from '@/constants/config';
import { nameState } from '@/store/atom/signUpAtom';
import {
  isLoginState,
  userDisabilityStatusState,
  userDisabilityTypeState,
  userProfileImageState,
} from '@/store/atom/userAtom';
import styles from './styles.module.scss';

export default function SignIn() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const setName = useSetRecoilState(nameState);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setProfileImage = useSetRecoilState(userProfileImageState);
  const setUserDisabilityStatus = useSetRecoilState(userDisabilityStatusState);
  const setUserDisabilityType = useSetRecoilState(userDisabilityTypeState);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.4.0/kakao.min.js';
    script.integrity =
      'sha384-mXVrIX2T/Kszp6Z0aEWaA8Nm7J6/ZeWXbL8UpGRjKwWe56Srd/iyNmWMBhcItAjH';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = () => {
      window.Kakao.init(JAVASCRIPT_KEY);
    };
    document.body.appendChild(script);
  }, []);

  const loginWithKakao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: REDIRECT_URL,
      scope: 'talk_calendar,profile_nickname,profile_image',
    }).then((error: any) => console.log(error.json()));
  };

  const submitHandler = async () => {
    const data = await getTestIdAPI(id);
    if (data.message === 'User not registered. Please sign up first.') {
      alert('등록된 아이디가 아닙니다.');
    } else if (data.message === 'Logged in successfully') {
      sessionStorage.setItem('access_token', data.data.access_token);
      const { user_name, user_image, disability_status, disability_type } =
        parseToken(data.data.access_token);
      setIsLogin(true);
      setName(user_name);
      setProfileImage(user_image);
      setUserDisabilityStatus(disability_status);
      if (disability_status) {
        setUserDisabilityType(disability_type);
      }
      navigate(ROUTE_PATHS.home);
    }
  };

  return (
    <>
      <Header color="wh" />
      <div className={styles.pageWrapper}>
        <div className={styles.contentWrapper}>
          <title className={styles.titleWrapper}>
            <div className={styles.text}>대화로 만들어가는 여행플래너</div>
            <div className={styles.title}>AI Travel Planner 길동이</div>
          </title>
          <img src={gildong} className={styles.img} />
          <div className={styles.test}>
            <label htmlFor="test">test ID</label>
            <input
              id="test"
              value={id}
              onChange={(event) => setId(event.target.value)}
              className={styles.testInput}
            />
            <Button variant="primary" onClick={submitHandler}>
              확인
            </Button>
          </div>
          <button className={styles.btnWrapper} onClick={loginWithKakao}>
            <div className={styles.btn}>
              <img src={kakao} />
              <span>카카오 로그인</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
}
