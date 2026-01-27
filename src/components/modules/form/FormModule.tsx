import { Input, type InputRefType } from "@/components/element/form/input/Input";
import { Btn } from "@/components/element/button/Btn";
import { useRef } from "react";
import styles from './FormModule.module.scss';
import { cn } from "@/utils/common";

// 🔹 form module
export interface FormInputType {
  id: string, // 필수
  label: string, // 타이틀
  type?: 'text' | 'password';
  required?: boolean, // 필수 여부
  error?: boolean, 
}

interface FormModulePropsType {
  className?: string;
  inputs: FormInputType[];
  btnTitle?: string;
  confirm: (values: Record<string, string>) => void;
}

export const FormModule = ({
  className,
  inputs,
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
      <div className={styles.formInner}>
        {inputs.map(({ id, label, type = 'text', error }) => (
          <div key={id} className={cn(styles.item, error && styles.error)}>
            <p className={styles.tit}>{label}</p>
            <Input
              id={id}
              type={type}
              error={error}
              ref={(el) => {
                inputRefs.current[id] = el;
              }}
            />
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
