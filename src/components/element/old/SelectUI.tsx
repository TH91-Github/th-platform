import { forwardRef } from "react";
import styled from "styled-components";


interface SelectPropsType {
  
}

export interface SelectUIRefType {
  refTextareaEl: () => HTMLTextAreaElement | null;
  refTextareaValue: () => string;
  refFocusEvent: () => void;
  refInitVal: (value: string) => void;
  refResetVal: () => void;
}

export const SelectUI = forwardRef<SelectUIRefType, SelectPropsType>(function Textarea({

}: SelectPropsType, ref) {
  

  return (
    <StyleWrap>
      
    </StyleWrap>
  )
});

const StyleWrap = styled.div`
 
`;
