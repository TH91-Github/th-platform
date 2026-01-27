import { useCallback, useState } from "react";

// 🔹 기본 toggle
interface UseTogglePropsType {
  toggle: () => void;
  open: () => void;
  close: () => void;
  set: (value: boolean) => void;
}

export const useToggle = (
  initialState = false
): [boolean, UseTogglePropsType] => {
  const [state, setState] = useState(initialState);

  const toggle = useCallback(() => {
    setState((prev) => !prev);
  }, []);

  const open = useCallback(() => { // true
    setState(true);
  }, []);

  const close = useCallback(() => { // false
    setState(false);
  }, []);

  const set = useCallback((value: boolean) => {
    setState(value);
  }, []);

  return [
    state,
    { toggle, open, close, set },
  ];
};


