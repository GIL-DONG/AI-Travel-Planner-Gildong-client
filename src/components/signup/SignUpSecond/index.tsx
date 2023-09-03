import RadioButtonGroup from '@components/common/RadioButtonGroup';
import { useState } from 'react';
import Select from '@components/common/Select';
import { BARRIER_LIST, BARRIER_TYPE_LIST } from '@constants/signup';
import InputTemplate from '../InputTemplate';

export default function SignUpSecond() {
  const [barrier, setBarrier] = useState('');
  const [barrierType, setBarrierType] = useState('');
  return (
    <>
      <InputTemplate id="barrier" name="장애여부">
        <RadioButtonGroup
          label="barrier"
          setRadioButtonItem={setBarrier}
          radioButtonlist={BARRIER_LIST}
        />
      </InputTemplate>
      <InputTemplate id="barrierType" name="장애종류">
        <Select
          label="name"
          selectList={BARRIER_TYPE_LIST}
          setSelectedItem={setBarrierType}
        />
      </InputTemplate>
    </>
  );
}
