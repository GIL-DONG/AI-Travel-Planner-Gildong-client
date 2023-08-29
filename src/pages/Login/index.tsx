import gildong from '@assets/gildong_3d_bg.png';
import kakao from '@assets/kakao.png';
import KakaoLogin from 'react-kakao-login';
import axios from 'axios';
import styles from './styles.module.scss';

export default function Login() {
  const kakaoClientId = import.meta.env.VITE_APP_JAVASCRIPT_KEY;
  const OnSuccess = async (data: any) => {
    const token = data.response.access_token;
    async function fetchData() {
      const data = await axios.get(
        `${
          import.meta.env.VITE_APP_API_URL
        }/kakao/user_info/token?access_token=${token}`,
      );
      console.log(data);
    }
    fetchData();
  };
  const OnFailure = (error: any) => {
    console.log(error);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <title className={styles.titleWrapper}>
          <div className={styles.text}>대화로 만들어가는 여행플래너</div>
          <div className={styles.title}>AI Travel Planner 길동이</div>
        </title>
        <img src={gildong} className={styles.img} />
        <KakaoLogin
          token={kakaoClientId}
          onSuccess={OnSuccess}
          onFail={OnFailure}
          render={({ onClick }) => (
            <button
              className={styles.btnWrapper}
              onClick={(e) => {
                e.preventDefault();
                onClick();
              }}
            >
              <div className={styles.btn}>
                <img src={kakao} />
                <span>카카오 로그인</span>
              </div>
            </button>
          )}
        ></KakaoLogin>
      </div>
    </div>
  );
}
