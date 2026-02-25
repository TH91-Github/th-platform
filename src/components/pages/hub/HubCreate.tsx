import { IconFolderAdd } from '@/assets/icon';
import { Btn } from '@/components/element/button/Btn';
import { Input, type InputRefType } from '@/components/element/form/input/Input';
import { Modal } from '@/components/element/modal/Modal';
import { TitlePoint } from '@/components/ui/text/TitlePoint';
import { useToggle } from '@/hook/common/useToggle';
import type { HubCategoryId, HubVisibility, MembersType } from '@/types/hub/hub';
import type { HubRoomType } from '@/types/hub/hubDB';
import { cn } from '@/utils/common';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';

interface HubCreatePropsType {
  title: string;
  className?: string;
}

// 분리 전 - 🔹 방만들기 폼
export const HubCreate = ({ title, className }: HubCreatePropsType) => {
  const [isModal, setIsModal] = useToggle(false);
  const titleRef = useRef<InputRefType>(null);
  const descRef = useRef<InputRefType>(null);
  const [category, setCategory] = useState<HubCategoryId>('travel');
  const [visibility, setVisibility] = useState<HubVisibility>('public');
  const [maxMember, setMaxMember] = useState<number>(5);

  // 초기화
  const resetForm = () => {
    titleRef.current?.reset();
    descRef.current?.reset();
    setCategory('travel');
    setVisibility('public');
    setMaxMember(5);
  };

  const handleClose = (close: () => void) => {
    close();
    resetForm();
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const now = Date.now();
    const titleVal = titleRef.current?.getValue() || '';
    const descVal = descRef.current?.getValue() || '';

    if (!titleVal.trim()) {
      console.log('제목 필수라구');
      return;
    }

    const dummyOwner = {
      name: '테스트',
      uid: 'uid_' + Math.random().toString(36).substring(2, 9),
    };

    const dummyMember: MembersType = {
      uid: dummyOwner.uid,
      nickName: dummyOwner.name,
      imgSrc: '#E1D9BC',
      email: 'test@test.com',
      joinAt: now,
      rank: 0,
    };

    const roomData: HubRoomType = {
      id: 'room_' + Math.random().toString(36).substring(2, 9),
      title: titleVal,
      desc: descVal,
      category,
      visibility,
      createdAt: now,
      updateAt: now,
      members: [dummyMember],
      maxMember,
      owner: dummyOwner,
    };

    console.log('확인용');
    console.log(roomData);

    // ✅ 초기화 + 모달 닫기
    resetForm();
    setIsModal.off();
  };

  return (
    <StyleWrap className={cn('hub-create', className)}>
      <Btn
        bType="primary"
        title={title}
        className="btn-create"
        onClick={() => setIsModal.on()}
      >
        <i><IconFolderAdd /></i>
        <span>{title}</span>
      </Btn>

      {isModal && (
        <Modal
          $width={420}
          $align="left"
          onClose={() => setIsModal.off()}
        >
          {(close) => (
            <StyleModal>
              <TitlePoint title="나만의 공간 만들어요. ☺️" pointType="underline" />
              <form onSubmit={handleSubmit}>
                <div className="form-wrap">
                  {/* 제목 */}
                  <div className="form-item">
                    <p>방 제목</p>
                    <Input
                      ref={titleRef}
                      id="hub-room-title"
                      placeholder="방 제목"
                    />
                  </div>
                  {/* 설명 */}
                  <div className="form-item">
                    <p>방 설명</p>
                    <Input
                      ref={descRef}
                      id="hub-room-desc"
                      placeholder="방 설명"
                    />
                  </div>
                  {/* 공개 / 카테고리 */}
                  <div className="form-row">
                    <div className="form-item">
                      <label>공개 설정</label>
                      <div className="checkbox-wrap">
                        <input
                          type="checkbox"
                          checked={visibility === 'private'}
                          onChange={(e) =>
                            setVisibility(
                              e.target.checked ? 'private' : 'public'
                            )
                          }
                        />
                        <span>
                          {visibility === 'private' ? '비공개' : '공개'}
                        </span>
                      </div>
                    </div>
                    <div className="form-item">
                      <label>카테고리</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as HubCategoryId) }
                      >
                        <option value="travel">travel</option>
                        <option value="calendar">calendar</option>
                        <option value="memo">memo</option>
                        <option value="cashledger">cashledger</option>
                        <option value="running">running</option>
                      </select>
                    </div>
                  </div>
                  {/* 최대 인원 */}
                  <div className="form-item">
                    <label>최대 인원</label>
                    <select
                      value={maxMember}
                      onChange={(e) => setMaxMember(Number(e.target.value))}
                    >
                      {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>{num}명</option>
                      ))}
                    </select>
                  </div>
                  {/* 버튼 */}
                  <div className="btn-wrap">
                    <Btn
                      type="button"
                      bType="gray"
                      reverse
                      onClick={() => handleClose(close)}
                    >
                      <span>취소</span>
                    </Btn>
                    <Btn
                      bType="primary"
                      type="submit"
                    >
                      <span>확인</span>
                    </Btn>
                  </div>

                </div>
              </form>
            </StyleModal>
          )}
        </Modal>
      )}
    </StyleWrap>
  );
};

/* ============================= */
/* 스타일 */
/* ============================= */

const StyleWrap = styled.div`
  .btn-create {
    display: flex;
    gap: 6px;
    align-items: center;

    & > i {
      width: 16px;
      height: 16px;
    }
  }
`;

const StyleModal = styled.div`
  .form-wrap {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }
  .form-item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    label {
      font-size: 14px;
      font-weight: 600;
    }
    select {
      height: 40px;
      padding: 0 10px;
      border-radius: 8px;
      border: 1px solid #ddd;
    }
  }
  .form-row {
    display: flex;
    gap: 16px;

    & > div {
      flex: 1;
    }
  }

  .checkbox-wrap {
    display: flex;
    align-items: center;
    gap: 8px;
    height: 40px;
  }

  .btn-wrap {
    margin-top: 10px;
    display: flex;
    gap: 10px;

    & > button:first-of-type {
      width: 90px;
    }

    & > button:last-of-type {
      flex: 1;
    }
  }
`;