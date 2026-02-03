import { useCallback, useState } from "react";

// 🔹 기본 toggle
interface UseTogglePropsType {
  toggle: () => void;
  on: () => void;
  off: () => void;
  set: (value: boolean) => void;
}

export const useToggle = (
  initialState = false
): [boolean, UseTogglePropsType] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  const on = useCallback(() => { // true
    setState(true);
  }, []);

  const off = useCallback(() => { // false
    setState(false);
  }, []);

  const set = useCallback((value: boolean) => {
    setState(value);
  }, []);

  return [
    state,
    { toggle, on, off, set },
  ];
};


