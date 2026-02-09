import { IconMatch } from '@/components/ui/icon/IconMatch';
import { useAuthUser } from '@/hook/auth/useAuthUser';
import { cn } from '@/utils/common';
import { dateFormat } from '@/utils/date/dateFormat';
import { AccountMenu } from './AccountMenu';
import styles from './MyPageDetail.module.scss';


export const ProfileSection = () =>{
  const user = useAuthUser();

  
  if(!user) return null
  return( 
    <div className={styles.sectionWrap}>
      <h3 className="blind">프로필 기본 정보</h3>
      <div className={styles.inner}>
        <div className={cn(styles.sectionItem, styles.point)}>
          <div className={styles.section}>
            <div className={cn(styles.profileImg, !user.profile && styles.notImg)}>
              { styles.profile ? (
                <img src={user.profile} alt={user.nickName + '프로필 사진'} />
                ) : (
                  <i className={styles.icon}><IconMatch id={'icon-user'} /></i>
                )}
            </div>
            <div className={styles.heading}>
              <i><IconMatch id={'icon-user'} /></i>
              <span className={styles.tag}>프로필</span>
              <span className={styles.tit}>대표 사진</span>
            </div>
            {/* <div className={styles.btnWrap}>
              <Btn
                freeHeight={true}
                className={styles.btnModify}
              >
                <span>수정</span>                
              </Btn>
            </div> */}
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>
              <i><IconMatch id={'icon-email'} /></i>
              <span className={styles.tag}>이메일</span>
              <span className={styles.tit}>{user.email}</span>
            </div>
            {/* 수정 버튼 이메일 확인하는 눈 표시 */}
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>
              <i><IconMatch id={'icon-access'} /></i>
              <span className={styles.tag}>간편아이디</span>
              <span className={styles.tit}>{user.simpleID}</span>
            </div>
            {/* 수정 버튼 */}
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>
              <i><IconMatch id={'icon-sign'} /></i>
              <span className={styles.tag}>닉네임</span>
              <span className={styles.tit}>{user.nickName}</span>
            </div>
            {/* 수정 버튼 */}
          </div>
        </div>
        {/* 추가 정보  */}
        <div className={styles.sectionItem}>
          <div className={styles.section}>
            <div className={styles.heading}>
              <i><IconMatch id={'icon-rank'} /></i>
              <span className={styles.tag}>등급</span>
              <span className={styles.tit}>{user.rank === 'admin' ? '관리자': '일반'}</span>
            </div>
            {/* 수정 버튼 */}
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>
              <i><IconMatch id={'icon-calendar'} /></i>
              <span className={styles.tag}>계정 생성일</span>
              {/* user.signupTime */}
              <span className={styles.tit}>{dateFormat(user.signupTime)}</span>
            </div>
            {/* 수정 버튼 */}
          </div>
          <div className={styles.section}>
            <div className={cn(styles.heading, styles.green)}>
              <i><IconMatch id={'icon-warning'} /></i>
              <span className={styles.tag}>계정 상태</span>
              <span className={styles.tit}>{user.permission ? '양호' : '위험'}</span>
            </div>
            {/* 수정 버튼 */}
          </div>
          <div className={styles.section}>
            <div className={styles.heading}>
              <i><IconMatch id={'icon-theme'} /></i>
              <span className={styles.tag}>현재 테마</span>
              {/* <span className={styles.tit}>{user.theme}</span> */}
            </div>
            {/* 수정 버튼 */}
          </div>
        </div>
        {/*  */}
        <div className={styles.sectionItem}>
          <div className={styles.section}>
            <div className={styles.heading}>
              <i><IconMatch id={'icon-unlock'} /></i>
              <span className={styles.tit}>로그아웃</span>
            </div>
          </div>
          <div className={styles.section}>
            <div className={cn(styles.heading, styles.red)}>
              <i><IconMatch id={'icon-trash'} /></i>
              <span className={styles.tit}>삭제</span>
            </div>
          </div>
        </div>
      </div>
      <AccountMenu />
    </div>
  )
}