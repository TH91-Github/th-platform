import { Input, type InputRefType } from "@/components/element/form/input/Input";
import { Btn } from "@/components/element/button/Btn";
import { useRef } from "react";
import styles from './FormModule.module.scss';
import { cn } from "@/utils/common";

// 🔹 form module
// input Type
export interface FormInputType {
  id: string, // 필수
  label: string, // 타이틀
  type?: 'text' | 'password';
  required?: boolean, // 필수 여부
  placeholder?: boolean, // label 사용 
  desc?: string, // 추가 설명
  errorMessage?: string, 
}

// module props type
interface FormModulePropsType {
  inputs: FormInputType[],
  requiredText?:string, // ex)필수입력 텍스트 표시
  className?: string,
  btnTitle?: string, // submit 버튼
  disabled?:boolean,
  resetKey?: number, // 초기화 - 렌더링하기 위함
  onInputFocus?: (focusedId: string) => void;
  confirm: (values: Record<string, string>) => void;
}

export const FormModule = ({
  className,
  inputs,
  requiredText,
  btnTitle = '확인',
  disabled,
  resetKey = 0,
  onInputFocus,
  confirm,
}: FormModulePropsType) => {
  const inputRefs = useRef<Record<string, InputRefType | null>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const values: Record<string, string> = {};

    for (const input of inputs) {
      const ref = inputRefs.current[input.id];
      const value = ref?.getValue() ?? '';

      if (input.required && !value.trim()) {
        alert(`${input.label}을(를) 입력해주세요.`);
        ref?.focus?.();
        return;
      }
      values[input.id] = value;
    }
    confirm(values);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={cn(styles.formModule, className)}
    >
      {requiredText && <p className={styles.requiredText}>{requiredText}</p>}
      <div className={styles.formInner}>
        {inputs.map(({ 
          id, label, required, type = 'text', placeholder, desc, errorMessage 
        }) => (
          <div key={id} className={cn(styles.inputItem, errorMessage && styles.error)}>
            <p className={cn(styles.tit, (requiredText && required)&& styles.required)}>{label}</p>
            <Input
              key={`${id}-${resetKey}`}
              type={type}
              required={required}
              error={!!errorMessage}
              placeholder={ placeholder ? label + ' 입력해주세요.' : undefined}
              ref={(el) => {
                inputRefs.current[id] = el;
              }}
              focusEvent={() => onInputFocus?.(id)}
            />
            {(desc || errorMessage) && <p className={styles.desc}>
              { errorMessage ? errorMessage : desc}
            </p>}
          </div>
        ))}
      </div>
      <div className={styles.btnWrap}>
        <Btn 
          type="submit" 
          bType="primary" 
          size="full"
          disabled={!!disabled}
        >
          <span>{btnTitle}</span>
        </Btn>
      </div>
    </form>
  );
};


/* 
** EX)
const [inputs, setInputs] = useState<FormInputType[]>([
  { 
    id: 'email', label: '이메일', required: true, errorMessage: '', placeholder: true,
    desc:'한글을 포함할 수 없으며, @ 포함되어야 합니다.'
  },
  { id: 'password-1', label: '비밀번호', type: 'password', required: true, errorMessage: '', placeholder: true,},
  { id: 'password-2', label: '비밀번호 확인', type: 'password', required: true, errorMessage: '', placeholder: true,},
]);
*/