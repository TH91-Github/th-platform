import { createHubRoom } from '@/api/firebase/hub/createHubRoom';
import { IconFolderAdd } from '@/assets/icon';
import { Btn } from '@/components/element/button/Btn';
import { CheckBox } from '@/components/element/form/checkbox/CheckBox';
import { Input, type InputRefType } from '@/components/element/form/input/Input';
import { SelectBox } from '@/components/element/form/select/SelectBox';
import { Modal } from '@/components/element/modal/Modal';
import { Loading } from '@/components/ui/effect/Loading';
import { TitlePoint } from '@/components/ui/text/TitlePoint';
import { useAuthUser } from '@/hook/auth/useAuthUser';
import { useToggle } from '@/hook/common/useToggle';
import { queryClient } from '@/lib/query/queryClient';
import { useAddToast } from '@/store/zustand/common/toastStore';
import type { HubCategoryId, HubVisibility } from '@/types/hub/hub';
import { cn } from '@/utils/common';
import { getHubUid, isColName } from '@/utils/hun/common';
import { useRef, useState } from 'react';
import styles from './HubCreate.module.scss';

//🔹 방만들기 폼
interface HubCreatePropsType {
  title: string;
  className?: string;
}

export const HubCreate = ({ title, className }: HubCreatePropsType) => {
  const { data: user } = useAuthUser();
  const addToast = useAddToast();
  const [isModal, setIsModal] = useToggle(false);
  const [isLoading, setIsLoading] = useState(false);
  const titleRef = useRef<InputRefType>(null);
  const descRef = useRef<InputRefType>(null);
  const [category, setCategory] = useState<HubCategoryId>('cashledger');
  const [visibility, setVisibility] = useState<HubVisibility>('private');
  const [maxMember, setMaxMember] = useState<number>(5);
  const [errors, setErrors] = useState<{
    title?: boolean;
    desc?: boolean;
  }>({});

  // 개발전 방 생성 막기 단계
  const [testModal, setTestModal] = useToggle(false);

  const handleTestModalClose = () => {
    setTestModal.off();
  }

  // 초기화
  const resetForm = () => {
    titleRef.current?.reset();
    descRef.current?.reset();
    setCategory('cashledger');
    setVisibility('private');
    setMaxMember(5);
    setIsModal.off();
  };

  // 닫기
  const handleClose = (close: () => void) => {
    close();
    resetForm();
  }

  // 확인 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    const titleVal = titleRef.current?.getValue() ?? '';
    const descVal = descRef.current?.getValue() ?? '';

    if (!titleVal.trim()) {
      setErrors({ title: true });
      titleRef.current?.focus();
      return;
    }

    // 방 작성자 회원/비회원 구분
    const owner = {
      uid: getHubUid(user),
      name: user?.nickName ?? '테스트',
      email: user?.email ?? 'TestUser@gmail.com',
      imgSrc: '#E1D9BC',
    }

    // 개발 단계 진행 중. 로컬에서만 가능 그 외 일시 금지 
    if (window.location.hostname !== 'localhost') {
      setTestModal.on();
      return;
    }
    
    try {
      setIsLoading(true);
      const isGuest = !user; // 비회원인경우
      const roomId = await createHubRoom({
        title: titleVal.trim(),
        desc: descVal.trim(),
        category,
        visibility,
        maxMember,
        owner,
      }, isGuest );

      console.log('Room Code', roomId);
      resetForm();
      addToast('방 생성 완료! 🥳👏','success');

      // 리스트 다시 불러오기
      const colName = isColName(isGuest, 'userRooms');
      queryClient.invalidateQueries({ queryKey: ['user', owner.uid, colName] });

    } catch (err) {
      resetForm();
      addToast('❌ 방 생성 실패...','error');
    } finally { 
      setIsLoading(false);
    }
  };

  return (
    <div className={className}>
      <Btn
        bType="primary"
        title={title}
        className={styles.createBtn}
        onClick={() => setIsModal.on()}
      >
        <i><IconFolderAdd /></i>
        <span>{title}</span>
      </Btn>

      {/* 개발 전 단계 로컬 외 막기 */}
      {testModal && (
        <Modal onClose={handleTestModalClose}>
          <div>
            ❌ 개발 진행 중으로 <br />
            방 생성을 진행할 수 없어요.. 😢
          </div>
        </Modal>
      )}

      {isModal && (
        <Modal
          $width={450}
          $align="left"
          onClose={() => {
            if (!isLoading) setIsModal.off();
          }}
        >
          {(close) => (
            <div className={styles.modalInner}>
              <TitlePoint title="나만의 공간 만들어요. ☺️" pointType="underline" />
              {! user && (
                <p className={styles.nonUser}>회원이 아닌 경우 테스트로 진행이 가능합니다.</p>
              )}
              <form onSubmit={handleSubmit}>
                <div className={styles.formInner}>
                  {/* 제목 */}
                  <div className={styles.formRow}>
                    <div className={styles.formItem}>
                      <p className={styles.tit}>방 제목</p>
                      <Input
                        ref={titleRef}
                        id="hub-room-title"
                        placeholder="방 제목"
                        error={!!errors.title}
                        changeEvent={() => {
                          if (errors.title) {
                            setErrors(prev => ({ ...prev, title: false }));
                          }
                        }}
                      />
                    </div>
                  </div>
                  {/* 설명 */}
                  <div className={styles.formRow}>
                    <div className={styles.formItem}>
                      <p className={styles.tit}>방 설명</p>
                      <Input
                        ref={descRef}
                        id="hub-room-desc"
                        placeholder="방 설명"
                        error={!!errors.desc}
                      />
                    </div>
                  </div>
                  {/* 공개 / 카테고리 */}
                  <div className={styles.formRow}>
                    <div className={cn(styles.formItem, styles.visibility)}>
                      <p className={styles.tit}>공개 설정</p>
                      <div className={styles.checkboxWrap}>
                        <CheckBox 
                          id="create-checkbox"
                          label={visibility === 'private' ? '비공개' : '공개'}
                          checked={visibility === 'private'}
                          onChange={(e) => setVisibility( e.target.checked ? 'private' : 'public' )}
                        />
                      </div>
                    </div>
                    <div className={styles.formItem}>
                      <p className={styles.tit}>카테고리</p>
                      <div>
                        <SelectBox 
                          options={
                            [
                              {value:'cashledger', label:'가계부'},
                              {value:'travel', label:'여행', disabled:true},
                              {value:'calendar', label:'일정', disabled:true},
                              {value:'memo', label:'메모', disabled:true},
                              {value:'running', label:'러닝', disabled:true},
                            ]
                          }
                          changeEvent={ (e) => console.log(e)}
                        />
                        <p className={styles.refText}>※ 현재 가계부만 작성 가능.</p>
                      </div>
                    </div>
                  </div>
                  {/* 최대 인원 */}
                  <div className={styles.formRow}>
                    <div className={styles.formItem}>
                      <p className={styles.tit}>최대 인원</p>
                      <SelectBox
                        options={Array.from({ length: 20 }, (_, i) => {
                          const num = i + 1;
                          return {
                            value: String(num),
                            label: `${num}명`,
                          };
                        })}
                        iniVal={String(maxMember)}
                        changeEvent={(val) => setMaxMember(Number(val))}
                      />
                    </div>
                  </div>
                  {/* 버튼 */}
                  <div className={styles.btnWrap}>
                    <Btn
                      type="button"
                      bType="gray"
                      reverse
                      disabled={isLoading}
                      onClick={() => handleClose(close)}
                    >
                      <span>취소</span>
                    </Btn>
                    <Btn
                      type="submit"
                      bType="primary"
                      disabled={isLoading}
                    >
                      <span>확인</span>
                    </Btn>
                  </div>
                </div>
              </form>
            </div>
          )}
        </Modal>
      )}
      { isLoading && <Loading text='생성 중...' />}
    </div>
  );
};