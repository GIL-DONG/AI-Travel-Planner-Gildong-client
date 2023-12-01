import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { headerStatusState } from '@/store/atom/globalAtom';

export default function useStatus(pageName: string, title: string | undefined) {
  const setHeaderStatus = useSetRecoilState(headerStatusState);

  useEffect(() => {
    setHeaderStatus({
      pageName: pageName,
      title: title,
    });
  }, [title]);
}
