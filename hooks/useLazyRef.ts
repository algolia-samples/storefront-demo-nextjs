import { useRef } from 'react';

export function useLazyRef<TValue>(initialValue: () => TValue) {
  const ref = useRef<TValue | null>(null);

  return function getRef() {
    if (ref.current === null) {
      ref.current = initialValue();
    }

    return ref.current;
  };
}
