import { useRecoilValue, useSetRecoilState } from 'recoil';
import Button from '@/components/common/Button';
import { consentState, indexState } from '@/store/atom/signUpAtom';
import Checkbox from '@/components/common/Checkboxes/Checkbox';
import styles from './styles.module.scss';

export default function ConsentInfo() {
  const setIndex = useSetRecoilState(indexState);
  const consent = useRecoilValue(consentState);
  const setConsent = useSetRecoilState(consentState);

  return (
    <div className={styles.container}>
      <p>
        안녕하세요,
        <br /> AI Travel Planner 길동이를 이용해 주셔서 감사합니다.
        <br />더 나은 여행 경험을 제공해 드리기 위해 몇 가지 정보를 수집하려고
        합니다.
        <br /> <br />
        <strong>수집하려는 개인정보 항목</strong> <br />
        <br />
        * 수집 항목: 성별, 나이대, 장애 여부, 장애 종류, 출발지, 선호 여행
        스타일
        <br />* 개인정보 수집 방법: 홈페이지(회원가입)
        <br /> <br />
        <strong>개인정보 수집 및 이용 목적</strong> <br />
        <br />
        수집한 개인정보를 다음의 목적을 위해 활용합니다.
        <br />
        <br />
        * 성별 및 나이대: 여행 추천 및 맞춤 여행 정보 제공
        <br />
        * 장애 여부 및 장애 종류: 특별한 서비스 또는 편의 조치 제공
        <br />
        * 출발지: 여행 추천 및 경로 계획
        <br />
        * 선호 여행 스타일: 맞춤 여행 제안 및 추천
        <br />
        <br />
        <strong>개인정보 보유 및 이용 기간</strong> <br /> <br />* 보유 및 이용
        기간: 회원 탈퇴 시 개인 정보는 파기됩니다.
      </p>
      <div className={styles.buttonWrapper}>
        <div className={styles.button}>
          <Checkbox
            id="consent"
            value="개인정보 수집 및 이용에 대해 동의합니다."
            onChange={() => setConsent(!consent)}
            checked={consent}
          />
          {consent ? (
            <Button
              variant="primary"
              full={true}
              size="lg"
              onClick={() => setIndex(1)}
            >
              다음
            </Button>
          ) : (
            <Button variant="disabled" full={true} size="lg" disabled={true}>
              다음
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
