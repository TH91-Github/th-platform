import { IconUser } from '@/assets/icon';
import { FormModule, type FormInputType } from '@/components/modules/form/FormModule';
import { validateEmail, validateLoginId, validateNickName, validatePassword, validatePasswordConfirm } from '@/utils/auth';
import { useState } from 'react';
import styles from './Members.module.scss';

interface SignUpPropsType {
  modeChange : () => void
}
export const SignUp = ({modeChange}: SignUpPropsType) => {
  // 이메일, 간편 아이디, 닉네임, 비밀번호, 비밀번호 확인
  const [inputs, setInputs] = useState<FormInputType[]>([
    { 
      id: 'email', label: '이메일', required: true, errorMessage: '', placeholder: true,
      desc:'한글을 포함할 수 없으며, @ 포함되어야 합니다.'
    },
    { 
      id: 'loginId', label: '간편 아이디', errorMessage: '', placeholder: true,
      desc:'특수문자, 한글을 사용할 수 없으며, 4~20자의 영문 대/소문자 포함하여 사용해주세요.'
    },
    { id: 'nickName', label: '닉네임/이름', errorMessage: '', placeholder: true,},
    { id: 'password-1', label: '비밀번호', type: 'password', required: true, errorMessage: '', placeholder: true,},
    { id: 'password-2', label: '비밀번호 확인', type: 'password', required: true, errorMessage: '', placeholder: true,},
  ]);

  // 에러 메시지 업데이트 함수
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


  const signupForm = (values: Record<string, string>) => {
    // 에러 메시지 초기화
    clearAllErrors();

    let isValid = true;

    // 이메일 검증
    const emailError = validateEmail(values.email ?? '');
    if (emailError) {
      updateErrorMessage('email', emailError);
      isValid = false;
    }

    // login id
    const loginIdError = validateLoginId(values.loginId ?? '');
    if (loginIdError) {
      updateErrorMessage('loginId', loginIdError);
      isValid = false;
    }

    // nickname
    const nickNameError = validateNickName(values.nickName ?? '');
    if (nickNameError) {
      updateErrorMessage('nickName', nickNameError);
      isValid = false;
    }
    // password
    const passwordError = validatePassword(values['password-1'] ?? '');
    if (passwordError) {
      updateErrorMessage('password-1', passwordError);
      isValid = false;
    }

    const passwordConfirmError = validatePasswordConfirm(
      values['password-1'] ?? '',
      values['password-2'] ?? ''
    );

    if (passwordConfirmError) {
      updateErrorMessage('password-2', passwordConfirmError);
      isValid = false;
    }

    if (!isValid) return;
    console.log(values);
    // ✅ 로그인 API 호출
  };

  console.log(new Date().getTime())

  // const signupPush = () => {
  //   const resultData  = {
  //     id:'',
  //     email: '',
  //     loginId: '',
  //     nickName: '',
  //     password: '',// 가짜 비밀번호로 #secret-암호문자 랜덤으로 넣어줘
  //     signupTime: new Date().getTime(),
  //     lastLogInTime: "",
  //     theme:"light",
  //     uid: '',
  //     rank:'0',
  //     permission:false,
  //     profile:'-',
  //   }
  // }


  // export interface UserDataType { // 🔹 DB 유저 정보
  //   id: string; // 필드 id
  //   email: string; // 가입 email
  //   simpleID: string; // 간편 ID
  //   nickName: string; // 이름 or 닉네임
  //   password: string; // 임의 비번 암호화 - 잠금 암호 걸때 사용
  //   rank: 'basic' | 'admin'; // 회원등급
  //   signupTime: Date; // 계정 생성 시간
  //   theme: {
  //     color:string; // 색상 저장
  //     mode: 'dark' | 'light';
  //   };
  //   permission:boolean; // 계정 승인 / 비승인
  //   profile: string; // 프로필 이미지 
  //   uid: string; // 고유 uid - firebase
  // }

  return(
    <div className={styles.membersInner}>
      <div className={styles.icon}>
        <i><IconUser /></i>
      </div>
      <h2 className={styles.title}>회원가입</h2>
      <FormModule
        inputs={inputs}
        btnTitle="회원가입"
        requiredText="필수 입력"
        className={styles.formWrap}
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
    </div>
  )
}