import { useState } from 'react';
import Checkboxes from '@components/common/Checkboxes';
import { travelStyleList } from '@constants/signup';
export default function SignUpFourth() {
  const [travelStyle, setTravelStyle] = useState<string[]>([]);
  return (
    <Checkboxes
      label="travel"
      checkBoxList={travelStyleList}
      checkedList={travelStyle}
      setCheckedList={setTravelStyle}
    />
  );
}
