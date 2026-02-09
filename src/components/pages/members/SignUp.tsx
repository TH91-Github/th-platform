import { IconUser } from '@/assets/icon';
import { Btn } from '@/components/element/button/Btn';
import { Modal } from '@/components/element/modal/Modal';
import { FormModule, type FormInputType } from '@/components/modules/form/FormModule';
import { Loading } from '@/components/ui/effect/Loading';
import { auth } from '@/firebase';
import { fireBaseSignUp } from '@/firebase/auth/signup';
import { validateSignup } from '@/utils/auth/auth';
import { cn } from '@/utils/common';
import { signOut } from 'firebase/auth';
import { useState } from 'react';
import styles from './Members.module.scss';

interface SignUpPropsType {
  modeChange : () => void
}
export const SignUp = ({modeChange}: SignUpPropsType) => {
  const [formResetKey, setFormResetKey] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  // 이메일, 비밀번호, 비밀번호 확인
  const [inputs, setInputs] = useState<FormInputType[]>([
    { 
      id: 'email', label: '이메일', required: true, errorMessage: '', placeholder: true,
      desc:'한글을 포함할 수 없으며, @ 포함되어야 합니다.'
    },
    { id: 'password-1', label: '비밀번호', type: 'password', required: true, errorMessage: '', placeholder: true,},
    { id: 'password-2', label: '비밀번호 확인', type: 'password', required: true, errorMessage: '', placeholder: true,},
  ]);

  // 에러 메시지 업데이트
  const updateErrorMessage = (fieldId: string, message: string) => {
    setInputs((prev) =>
      prev.map((input) =>
        input.id === fieldId ? { ...input, errorMessage: message } : input
      )
    );
  };
  // 모든 에러 메시지 초기화
  const clearAllErrors = () => {
    setInputs((prev) =>
      prev.map((input) => ({ ...input, errorMessage: '' }))
    );
  };

  // 에러 있는 input 포커스 in error 해제
  const handleFocus = (focusedId: string) => {
    updateErrorMessage(focusedId, '');
  };

  // ✅ 회원 가입 
  const signupForm = async (values: Record<string, string>) => {
    // 에러 메시지 초기화
    clearAllErrors();

    // 유효성 체크
    const { isValid, errors } = validateSignup(values);
    if (!isValid) {
      Object.entries(errors).forEach(([field, message]) => {
        updateErrorMessage(field, message as string);
      });
      return;
    }
    try {
      // loading
      setIsLoading(true);

      // 회원가입 요청
      await fireBaseSignUp({
        email: values.email,
        password: values['password-1'],
      });
      // 회원 가입하면 자동으로 로그인 상태 방지
      await signOut(auth);

      setAlertMessage({
        success: true,
        message: '회원가입이 완료되었습니다.',
      });
      setFormResetKey(prev => prev +1);

    } catch (error: any) {
      // Firebase Auth 이메일 중복
      if (error.code === 'auth/email-already-in-use') {
        updateErrorMessage('email', '이미 가입된 이메일입니다.');
        return;
      }
      // 그 외 에러
      updateErrorMessage('email', '회원가입에 실패했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePopupClick = () => {
    if (alertMessage?.success) {
      modeChange();
    }
    setAlertMessage(null)
  }

  return(
    <div className={cn(
        styles.signup, styles.membersInner, styles.ani,
        isLoading && styles.lock
      )}
    >
      <div className={styles.icon}>
        <i><IconUser /></i>
      </div>
      <h2 className={styles.title}>회원가입</h2>
      <FormModule
        inputs={inputs}
        btnTitle="회원가입"
        requiredText="필수 입력"
        className={styles.formWrap}
        disabled={isLoading}
        resetKey={formResetKey}
        onInputFocus={handleFocus}
        confirm={signupForm}
      />
      <div className={styles.modeBox}>
        <span className={styles.text}>계정이 있다면! </span>
        <button 
          type="button"
          title="로그인하러 가기"
          className={styles.modeBtn}
          onClick={modeChange}
        >
          <span>"로그인하기"</span>
        </button>
      </div>
      { isLoading && <Loading dimmed={true} mode="body"/> }
      { alertMessage && (
        <Modal onClose={handlePopupClick}>
          <div className={styles.alert}>
            <p className={styles.tit}>{alertMessage.message}</p>
            <div className={styles.btnWrap}>
              <Btn
                bType="primary"
                onClick={handlePopupClick}
              >
                <span>확인</span>
              </Btn>
            </div>
          </div>          
        </Modal>
      )}
    </div>
  )
}