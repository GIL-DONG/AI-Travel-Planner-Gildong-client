import { selector } from 'recoil';
import { SignUpTypes } from '@/types/signUp';
import {
  ageGroupState,
  disabilityStatusState,
  disabilityTypeState,
  genderState,
  idState,
  nickNameState,
  preferTravelStyleState,
  residenceState,
} from '../atom/signUpAtom';
import { userProfileImageState } from '../atom/userAtom';

export const signUpStateSelector = selector({
  key: 'signUpState',
  get: ({ get }): SignUpTypes => {
    const id = get(idState);
    const nickName = get(nickNameState);
    const ageGroup = get(ageGroupState);
    const gender = get(genderState);
    const disabilityStatus = get(disabilityStatusState);
    const disabilityType = get(disabilityTypeState);
    const preferTravelStyle = get(preferTravelStyleState);
    const residence = get(residenceState);
    const profileImage = get(userProfileImageState);

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
      userID: id + '' || '',
      user_name: nickName,
      age_group: +ageGroup.slice(0, 2),
      gender: gender === '남자' ? '남' : '여',
      prefer_travel: preferTravelStyle,
      residence: residence?.location,
      disability_status: disabilityStatus === '예' ? true : false,
      disability_type: disabilityStatus === '예' ? type : '',
      user_photo: profileImage || 'default',
    };
  },
});
