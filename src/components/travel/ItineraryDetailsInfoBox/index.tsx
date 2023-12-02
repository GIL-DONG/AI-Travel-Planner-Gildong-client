import React, { SetStateAction, useEffect } from 'react';
import { ItineraryScheduleTypes } from '@/types/travel';
import ItineraryDetailsContent from './ItineraryDetailsContent';
import ItineraryDetailsTab from './ItineraryDetailsTab';

interface ItineraryDetailsInfoBoxProps {
  itineraryDetailsList: string[];
  groupByDate: Record<string, ItineraryScheduleTypes[]>;
  currentTab: string;
  setCurrentTab: React.Dispatch<SetStateAction<string>>;
}

export default function ItineraryDetailsInfoBox({
  itineraryDetailsList,
  groupByDate,
  currentTab,
  setCurrentTab,
}: ItineraryDetailsInfoBoxProps) {
  return (
    <>
      <ItineraryDetailsTab
        itineraryDetailsList={itineraryDetailsList}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <ItineraryDetailsContent
        currentTab={currentTab}
        groupByDate={groupByDate}
      />
    </>
  );
}
