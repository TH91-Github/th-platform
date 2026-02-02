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
  btnTitle?: string;
  confirm: (values: Record<string, string>) => void;
}

export const FormModule = ({
  className,
  inputs,
  requiredText,
  btnTitle = '확인',
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
              id={id}
              type={type}
              required={required}
              error={!!errorMessage}
              placeholder={ placeholder ? label + ' 입력해주세요.' : undefined}
              ref={(el) => {
                inputRefs.current[id] = el;
              }}
            />
            {(desc || errorMessage) && <p className={styles.desc}>
              { errorMessage ? errorMessage : desc}
            </p>}
          </div>
        ))}
      </div>
      <div className={styles.btnWrap}>
        <Btn type="submit" bType="primary" size="full">
          <span>{btnTitle}</span>
        </Btn>
      </div>
    </form>
  );
};
