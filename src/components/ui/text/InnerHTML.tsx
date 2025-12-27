import { cn, sanitizeHtml } from "@/utils/common";

// 🔹 HTML 속성으로 값을 입력해야하는 경우
interface InnerHTMLPropsType { 
  text:string;
  className?:string;
}
export const InnerHTML = ({
  text,
  className,
}:InnerHTMLPropsType) => {
  return (
    <span
       className={cn(className)}
       dangerouslySetInnerHTML={{__html:sanitizeHtml(text)}}
    />
  )
}