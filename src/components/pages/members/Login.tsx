import { IconGoogle, IconLock } from '@/assets/icon';
import { Btn } from '@/components/element/button/Btn';
import { Modal } from '@/components/element/modal/Modal';
import { FormModule, type FormInputType } from '@/components/modules/form/FormModule';
import { Loading } from '@/components/ui/effect/Loading';
import { InnerHTML } from '@/components/ui/text/InnerHTML';
import { fireBaseGoogleLogin } from '@/firebase/auth/googleLogin';
import { fireBaseLogin } from '@/firebase/auth/login';
import { cn } from '@/utils/common';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Members.module.scss';
import { saveSession } from '@/utils/auth/session';

interface LoginPropsType {
  modeChange?: () => void,
}
const APP_TITLE = import.meta.env.VITE_APP_TITLE ?? '';

export const Login = ({modeChange}:LoginPropsType) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [inputs, setInputs] = useState<FormInputType[]>([
    { id: 'loginId', label: '아이디', required: true, errorMessage: '' },
    { id: 'password', label: '비밀번호', type: 'password', required: true, errorMessage: '' },
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

  const loginForm = async (values: Record<string, string>) => {
    clearAllErrors();
    let isValid = true;
    if (!values.loginId) {
      updateErrorMessage('loginId', '아이디를 입력해주세요.');
      isValid = false;
    }

    if (!values.password) {
      updateErrorMessage('password', '비밀번호를 입력해주세요.');
      isValid = false;
    }

    if (!isValid) return;
    try {
      // loading
      setIsLoading(true);
      await fireBaseLogin({
        loginId: values.loginId,
        password: values.password,
      });
    
    } catch (error: any) {
      if (error.message === 'SIMPLE_ID_NOT') {
        updateErrorMessage(
          'loginId',
          `존재하지 않는 간편 아이디입니다. 이메일로 로그인해주세요.`
        );
        return;
      }
      setAlertMessage({
        success: false,
        message: `아이디 또는 비밀번호가 <br />올바르지 않습니다.`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // google form
  const handleGoogle = async (e:React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await fireBaseGoogleLogin();
      setAlertMessage({
        success: true,
        message: 'Google 로그인 성공!',
      });
      // 로그인 성공 후 유저 정보는 로크인 체크에서 진행
      navigate('/')
    } catch (error) {
      setAlertMessage({
        success: false,
        message: '로그인 실패했습니다.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handlePopupClick = () => {
    setAlertMessage(null)
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
        disabled={isLoading}
        onInputFocus={handleFocus}
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
      { isLoading && <Loading dimmed={true} mode="body"/> }
      { alertMessage && (
        <Modal onClose={handlePopupClick}>
          <div className={styles.alert}>
            <p className={styles.tit}>
              <InnerHTML text={alertMessage.message}/>
            </p>
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