import { selector } from 'recoil';
import {
  ageGroupState,
  disabilityStatusState,
  disabilityTypeState,
  genderState,
  idState,
  nameState,
  preferTravelStyleState,
  residenceState,
} from '../atom/signUpAtom';

export const signUpStateSelector = selector({
  key: 'signUpState',
  get: ({ get }) => {
    const id = get(idState);
    const name = get(nameState);
    const ageGroup = get(ageGroupState);
    const gender = get(genderState);
    const disabilityStatus = get(disabilityStatusState);
    const disabilityType = get(disabilityTypeState);
    const preferTravelStyle = get(preferTravelStyleState);
    const residence = get(residenceState);

    let type = '';
    if (disabilityType === '시각장애') {
      type = 'visual';
    } else if (disabilityType === '지체장애') {
      type = 'physical';
    } else if (disabilityType === '청각장애') {
      type = 'hearing';
    } else if (disabilityType === '기타') {
      type = 'etc';
    }

    return {
      userID: id || sessionStorage.getItem('id'),
      user_name: name,
      age_group: +ageGroup.slice(0, 2),
      gender: gender === '남자' ? '남' : '여',
      prefer_travel: preferTravelStyle,
      residence: { lat: 37.5665, lon: 126.978 },
      disability_status: disabilityStatus === '예' ? 'true' : 'false',
      disability_type: disabilityStatus === '예' ? type : '',
    };
  },
});
