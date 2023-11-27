import { useState } from 'react';
import { TravelDetailsTypes } from '@/types/travel';
import DisabilityInfoContent from './DisabilityInfoContent';
import DisabilityInfoTab from './DisabilityInfoTab';

interface DisabilityInfoBoxProps {
  detailData: TravelDetailsTypes;
}

export default function DisabilityInfoBox({
  detailData,
}: DisabilityInfoBoxProps) {
  const disabilityInfoList = [
    { name: '시각장애인', content: detailData.visual },
    { name: '지체장애인', content: detailData.physical },
    { name: '청각장애인', content: detailData.hearing },
  ];
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <>
      <DisabilityInfoTab
        disabilityInfoList={disabilityInfoList}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <DisabilityInfoContent
        disabilityInfoList={disabilityInfoList}
        currentTab={currentTab}
      />
    </>
  );
}
