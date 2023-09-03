import { useState } from 'react';
import Checkboxes from '@components/common/Checkboxes';
import { TRAVEL_STYLE_LIST } from '@constants/signup';

export default function SignUpFourth() {
  const [travelStyle, setTravelStyle] = useState<string[]>([]);
  return (
    <Checkboxes
      label="travel"
      checkBoxList={TRAVEL_STYLE_LIST}
      checkedList={travelStyle}
      setCheckedList={setTravelStyle}
    />
  );
}
