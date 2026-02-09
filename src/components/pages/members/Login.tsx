import { IconGoogle, IconLock } from '@/assets/icon';
import { Btn } from '@/components/element/button/Btn';
import { CheckBox } from '@/components/element/form/checkbox/CheckBox';
import { Modal } from '@/components/element/modal/Modal';
import { FormModule, type FormInputType } from '@/components/modules/form/FormModule';
import { Loading } from '@/components/ui/effect/Loading';
import { InnerHTML } from '@/components/ui/text/InnerHTML';
import { fireBaseGoogleLogin } from '@/firebase/auth/googleLogin';
import { fireBaseLogin } from '@/firebase/auth/login';
import { saveSession } from '@/utils/auth/session';
import { cn } from '@/utils/common';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Members.module.scss';
import { ConfirmModal } from '@/components/modules/modal/ConfirmModal';
import { validateLogin } from '@/utils/auth/auth';

// 🔹 로그인

const APP_TITLE = import.meta.env.VITE_APP_TITLE ?? '';
const STORAGE_ID_KEY = 'platform-login-id';
interface LoginPropsType {
  modeChange?: () => void,
}

interface LoginOptionState {
  rememberId: boolean;
  rememberMe: boolean;
  isModalOpen: boolean;
}

export const Login = ({modeChange}:LoginPropsType) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  
  const [optionState, setOptionState] = useState<LoginOptionState>({
    rememberId: false,
    rememberMe: false,
    isModalOpen: false,
  });

  const [inputs, setInputs] = useState<FormInputType[]>([
    { id: 'loginId', label: '아이디', required: true, errorMessage: '' },
    { id: 'password', label: '비밀번호', type: 'password', required: true, errorMessage: '' },
  ]);

  // id 기억하기
  useEffect(() => {
    const savedId = localStorage.getItem(STORAGE_ID_KEY);
    if (!savedId) return;

    setOptionState(prev => ({
      ...prev,
      rememberId: true,
    }));

    setInputs(prev =>
      prev.map(input =>
        input.id === 'loginId'
          ? { ...input, initVal: savedId }
          : input
      )
    );
  }, []);

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

    const { isValid, errors } = validateLogin(values);
    if (!isValid) {
      Object.entries(errors).forEach(([field, message]) => {
        updateErrorMessage(field, message as string);
      });
      return;
    }
    
    try {
      // loading
      setIsLoading(true);
      await fireBaseLogin({
        loginId: values.loginId,
        password: values.password,
      });
    
      saveSession(optionState.rememberMe);

      // ✅ ID 기억하기
      if (optionState.rememberId) {
        localStorage.setItem(STORAGE_ID_KEY, values.loginId);
      } else {
        localStorage.removeItem(STORAGE_ID_KEY);
      }

      // 로그인 완료 후 홈으로 이동은 MemberPage.tsx에서
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
      saveSession(optionState.rememberMe);
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

  const handleLoginRemember = (checked: boolean) => {
    if (!checked) {
      setOptionState(prev => ({
        ...prev,
        rememberMe: false,
      }));
      return;
    }

    // 체크하려고 하면 모달 열기
    setOptionState(prev => ({
      ...prev,
      isModalOpen: true,
    }));
  };

  const handleConfirm = () => {
    setOptionState(prev => ({
      ...prev,
      rememberMe: true,
      isModalOpen: false,
    }));
  };

  const handleCancel = () => {
    setOptionState(prev => ({
      ...prev,
      isModalOpen: false,
    }));
  };

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
      <div className={styles.checkboxWrap}>
        <CheckBox 
          label="ID 기억하기"
          className={styles.check}
          checked={optionState.rememberId}
          onChange={(e) =>
            setOptionState(prev => ({
              ...prev,
              rememberId: e.target.checked,
            }))
          }
        />
        <CheckBox 
          label="로그인 유지하기"
          className={styles.check}
          checked={optionState.rememberMe}
          onChange={(e) => handleLoginRemember(e.target.checked)}
        />
        {optionState.isModalOpen && (
          <ConfirmModal
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          >
            <div>
              ⚠️<br />
              로그인 상태를 유지하시겠습니까?<br />
              공용 또는 타인의 기기에서는 <br />
              보안에 주의하세요! 
            </div>
          </ConfirmModal>
        )}
      </div>
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