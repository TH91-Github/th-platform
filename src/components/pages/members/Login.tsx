import { IconGoogle, IconLock } from '@/assets/icon';
import { FormModule, type FormInputType } from '@/components/modules/form/FormModule';
import { cn } from '@/utils/common';
import { useState } from 'react';
import styles from './Members.module.scss';

interface LoginPropsType {
  modeChange?: () => void,
}
const APP_TITLE = import.meta.env.VITE_APP_TITLE ?? '';

export const Login = ({modeChange}:LoginPropsType) => {
  const [inputs, setInputs] = useState<FormInputType[]>([
    { id: 'loginId', label: '아이디', required: true, errorMessage: '' },
    { id: 'password', label: '비밀번호', type: 'password', required: true, errorMessage: '' },
  ]);

  const loginForm = (values: Record<string, string>) => {
    let hasError = false;

    const nextInputs = inputs.map((input) => {
      if (input.required && !values[input.id]?.trim()) {
        hasError = true;
        return { ...input, error: true };
      }
      return { ...input, error: false };
    });

    setInputs(nextInputs);

    if (hasError) return;

    console.log(values.loginId, values.password);
    // ✅ 로그인 API 호출
  };



  // goggle form
  const handleGoogle = (e:React.FormEvent) => {
    e.preventDefault();
  }

  return(
    <div className={cn(styles.login, styles.membersInner, styles.ani)}>
      <div className={styles.icon}>
        <i><IconLock /></i>
      </div>
      <h2 className={styles.title}>{APP_TITLE} 로그인</h2>
      <FormModule
        inputs={inputs}
        btnTitle="로그인"
        className={styles.formWrap}
        confirm={loginForm} 
      />
      <div className={styles.authenticationDivider}>
        <span>or</span>
      </div>
      <div className={styles.googleFrom}>
        <form onSubmit={(e) => handleGoogle(e)}>
          <button
            type="submit"
            title="구글 로그인 하기"
            className={styles.googleBtn}
          >
            <i><IconGoogle /></i>
            <span>Google로 로그인</span>
          </button>
        </form>
      </div>
      <div className={styles.modeBox}>
        <span className={styles.text}>아이디가 없어요?</span>
        <button 
          type="button"
          title="회원가입하러 가기"
          className={styles.modeBtn}
          onClick={modeChange}
        >
          <span>"가입하기"</span>
        </button>
      </div>
    </div>
  )
}