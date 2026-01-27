import { Btn } from "@/components/element/button/Btn";
import { CodeHljs } from "@/components/element/highlight/CodeHljs";
import { Modal } from "@/components/element/modal/Modal";
import { TitlePoint } from "@/components/ui/text/TitlePoint";
import { cn } from "@/utils/common";
import { partialUndisclosed, stripIndent } from "@/utils/textUtils";
import { useState } from "react";
import styles from '../../Detail.module.scss';
import { Calendar } from "@/components/element/calendar/Calendar";
import type { DemoItemType } from "@/types/guide";

// 🔹 CalendarDetail 컴포넌트 설명

const DETAIL_TITLE ='Calendar';
const DEMO_DATA:DemoItemType[] = [
  {
    tit:`데모`,
    desc:['일반 Calendar 컴포넌트 사용 필수 옵션 x'],
  },
  {
    tit:`읽기 전용`,
    desc:['isReadonly: true'],
    option:{
      isReadonly:true
    }
  },
  {
    tit:`선택 날짜 1월29일~2월 5일 date 값 전달`,
    desc:['selectDates:{ start: new Date(2026, 0, 29), end: new Date(2026, 1, 5)}'],
    option:{
      selectDates:{
        start: new Date(2026, 0, 29),
        end: new Date(2026, 1, 5)
      }
    }
  },
  {
    tit:`날짜 단일 선택`,
    desc:['selectOne: true', 'onChange?: (range: DateRange) => void; // 선택값 반환'],
    option:{
      selectOne: true
    }
  },
]

const EX_CODE = stripIndent(`
  <Calendar 
    selectDates // 선택 날짜
    events // 이벤트(등록 일정 전달)
    isHolidays, // 공휴일 on/off
    isReadonly, // 읽기전용
    selectOne, // 단일 선택
    onChange, // 선택 날짜 확인
    // 👇 (date: Date, events?: CalendarEvent[]) => React.ReactNode; // 부모에서 특정 날 렌더
    dayRender={(_, events) => {
      if (!events || events.length === 0) return null;
      return events.map((event, i) => (
        <span key={i} className="test">{event.label}</span>
      ));
    }}
  />`
);
export const CalendarDetail = () => {


  return ( 
    <div className={cn('guide-detail', styles.sectionWrap)}>
      <div className={styles.sectionHeading}>
        <TitlePoint
          titleTag={'p'}
          title={DETAIL_TITLE}
          pointType="underline"
          $fontSize={20}
          className={styles.tit}
        />
        <p> {partialUndisclosed("abc",3)}</p>
        <p className={styles.desc}>달력(일정) 컴포넌트, Week, DateGrid 컴포넌트 분리</p>
        <p className={styles.desc}>단순 달력 표시 및 일정 선택, 일정 표시, 공휴일 체크</p>
        <p className={styles.desc}>공휴일, 이벤트 일정, 단일 선택, 기간 선택, 읽기 전용 옵션</p>
        {/* <ul className={cn(styles.linkLists, 'bullet-lists')}>
          <li>
            <OutLink
              href={'/'}
              title={'url 입력하기'}
            />
          </li>
        </ul> */}
      </div>
      <div className={cn(styles.sectionLists)}>
        {
          DEMO_DATA.map((demoItem,demoIdx) => (
            <div className={styles.sectionItem} key={demoIdx}>
              <TitlePoint
                titleTag={'p'}
                title={`${DETAIL_TITLE} ${demoItem.tit}`}
                pointType="underline"
                className={styles.tit}
              />
              <div className={styles.demoWrap}>
                {demoItem.desc.map((descItem, descIdx) => (
                  <p className={styles.desc} key={descIdx}>{descItem}</p>
                ))}
                <div className={styles.demo}>
                  <Calendar 
                    {...demoItem.option}
                  />
                </div>
              </div>
            </div>
          ))
        }
      </div>
      <div className={styles.codeWrap}>
        <TitlePoint
          titleTag={'p'}
          title={`${DETAIL_TITLE} 사용 예`}
          pointType="underline"
          className={styles.tit}
        />
        <CodeHljs
          code={EX_CODE}
          language={'tsx'}
          className={styles.code}
        />
      </div>
    </div>
  )
}