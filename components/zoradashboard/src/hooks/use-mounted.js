import { useEffect, useRef } from 'react';

export const useMounted = () => {
  const isMounted = useRef(true);

  useEffect(() => () => {
    isMounted.current = false;
  }, []);

  return isMounted;
};
