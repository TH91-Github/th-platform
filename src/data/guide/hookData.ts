import type { GuidePopupDataType } from "@/types/guide"

export const hookData: GuidePopupDataType[] = [
  {
    id: 'toggle',
    title: 'useToggle',
    desc: 'boolean값 toggle',
    category: 'state',
    keyword: ['toggle','useState','useToggle','토글'],
    link: '',
    popInfo:{
      tit:'useToggle()',
      desc:[
        'toggle, toggleChange 구성되어 있습니다.',
        'toggleChange(), toggleChange(false), toggleChange(true) 사용'
      ],
      code:`
        const [isToggle, setIsToggle] = useToggle();`
    },
  },
  {
    id: 'copy-toast',
    title: 'useCopyToast',
    desc: 'Copy + Toast 사용',
    category: 'toast',
    keyword: ['copy','toast','useCopyToast','복사','복사팝업'],
    link: '',
    popInfo:{
      tit:'useAddToast()',
      desc:[
        '복사할 Value 필수',
        '복사 완료 후 Toast',
        '복사 여부 알림',
      ],
      code:`
        const { copy } = useCopyToast();
        // 조건
        copy(
          value: string, 
          options?: {
            successMessage: 복사 성공 시 message
            errorMessage:실패 message
            type: Toast Type 조건 base success error 
          }
        );
        // 사용
        copy('복사할 Value');
        copy('복사할 Value',{type:'success'});`
    },
  },
]
