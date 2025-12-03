import { useState } from "react";

// 🔹 기본 toggle
export const useToggle = (toggleState = false): [boolean, (next?: boolean) => void] => {
  const [toggle, setToggle] = useState(toggleState);
  const toggleChange = (next?: boolean) => {
    if (typeof next === "boolean") {
      setToggle(next);
    } else {
      setToggle((prev) => !prev);
    }
  };
  return [toggle, toggleChange];
};


