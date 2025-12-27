// 임시 데이터 구조만 준비

export const divisionData = [
  {
    id:'ceo',
    title:'CEO',
    leader:{
      name:'이름',
      extNo:'0220170000',
      phone:'01000000000',
    }
  },
  {
    id:'communication',
    title:'커뮤니케이션',
    leader:{
      name:'이름',
      extNo:'0220170000',
      phone:'01000000000',
    },
    teams:[
      {
        id:'communication-1',
        title:'커뮤니케이션 1팀',
        leaders:[
          {
            membersID:'communication-member-1',
            projectID:'', // 없는 경우 빈 값
            name:'이름',
            extNo:'0220170000',
            phone:'01000000000',
          }
        ],
        project:[
          {
            projectID:'#skt', // project 코드와 동일하게
            title:'SKT',
          }
        ],
        members:[
          {
            membersID:'communication-member-12',
            projectID:'ddd', // project 코드와 동일하게
            name:'이름',
            extNo:'0220170000',
            phone:'01000000000',
          }
        ]
      },
      {
        id:'communication-2',
        title:'커뮤니케이션 2팀',
        leaders:[
          {
            membersID:'communication-member-2',
            projectID:'', // 없는 경우 빈 값
            name:'이름',
            extNo:'0220170000',
            phone:'01000000000',
          }
        ],
        project:[
          {
            projectID:'#skt', // project 코드와 동일하게
            title:'SKT',
          }
        ],
        members:[
          {
            membersID:'communication-member-12',
            projectID:'ddd', // project 코드와 동일하게
            name:'이름',
            extNo:'0220170000',
            phone:'01000000000',
          }
        ]
      },
    ],
  },
  {
    id:'ux',
    title:'UX',
    leader:{
      name:'이름',
      extNo:'0220170000',
      phone:'01000000000',
    },
    teams:[
      {
        id:'ux-1',
        title:'커뮤니케이션 1팀',
        leaders:[
          {
            membersID:'ux-member-1',
            projectID:'', // 없는 경우 빈 값
            name:'이름',
            extNo:'0220170000',
            phone:'01000000000',
          }
        ],
        project:[
          {
            projectID:'#skt', // project 코드와 동일하게
            title:'SKT',
          }
        ],
        members:[
          {
            membersID:'ux-member-12',
            projectID:'ddd', // project 코드와 동일하게
            name:'이름',
            extNo:'0220170000',
            phone:'01000000000',
          }
        ]
      },
      {
        id:'ux-2',
        title:'커뮤니케이션 2팀',
        leaders:[
          {
            membersID:'ux-member-2',
            projectID:'', // 없는 경우 빈 값
            name:'이름',
            extNo:'0220170000',
            phone:'01000000000',
          }
        ],
        project:[
          {
            projectID:'#skt', // project 코드와 동일하게
            title:'SKT',
          }
        ],
        members:[
          {
            membersID:'communication-member-12',
            projectID:'ddd', // project 코드와 동일하게
            name:'이름',
            extNo:'0220170000',
            phone:'01000000000',
          }
        ]
      },
    ],
  }
]