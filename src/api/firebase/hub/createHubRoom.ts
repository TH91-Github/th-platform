import { collection, doc, runTransaction, increment } from 'firebase/firestore';
import { fireDB } from '@/firebase';
import { initCashledgerSummary } from './categoryIni';
import { addUserRoom } from './userRooms';
import { isColName } from '@/utils/hun/common';
import type { HubRoomType } from '@/types/hub/firebase';
import type { HubCategoryId, HubVisibility } from '@/types/hub/hub';

// 🔹 hub 방 생성 
interface CreateHubRoomPayload {
  title: string;
  desc: string;
  category: HubCategoryId;
  visibility: HubVisibility;
  maxMember: number;
  owner: {
    uid: string;
    name: string;
    email?: string;
    imgSrc?: string;
  };
}

export const createHubRoom = async (
  payload: CreateHubRoomPayload,
  isGuest: boolean
) => {
  const now = Date.now();

  // 회원 / 비회원 컬렉션 구분
  const roomCollection = isColName(isGuest,'hubRooms');
  const statsCollection = isColName(isGuest,'hubStats');

  const roomRef = doc(collection(fireDB, roomCollection));
  const statsRef = doc(fireDB, statsCollection, 'main');

  const ymKey = new Date(now).toISOString().slice(0, 7); // "2026-03"
  const modeKey = payload.maxMember > 1 ? 'team' : 'single';

  await runTransaction(fireDB, async (tx) => {
    // 🔹 방 생성
    const roomData: HubRoomType = {
      id: roomRef.id, // doc id
      title: payload.title,
      desc: payload.desc,
      category: payload.category,
      visibility: payload.visibility,
      createdAt: now,
      maxMember: payload.maxMember,
      updateAt: now,
      owner: {
        uid: payload.owner.uid,
        name: payload.owner.name,
      },
      members: [
        {
          uid: payload.owner.uid,
          nickName: payload.owner.name,
          imgSrc: payload.owner.imgSrc ?? '',
          email: payload.owner.email ?? '',
          joinAt: now,
          rank: 0,
        },
      ],
    };

    tx.set(roomRef, roomData);

    // userRooms 생성
    addUserRoom(tx, fireDB, roomData, isGuest);

    // 🔹 category 초기화 -- 초기 생성 많아질 경우 불필요할 가능성 있음 : 정보 입력 시 추가하는 방향
    switch (payload.category) {
      case 'cashledger':
        initCashledgerSummary(tx, roomRef, now);
        break;
    }
    
    // 🔹 통계 증가 : . 사용하는 이유는 firebase
    // 객체를 dot path (.) 로 업데이트하는 게 정석이라서 유지하는 게 좋다고 함. 
    // increment() 서버 숫자필드를 원자적으로 증가/감소 업데이트가 쉬움. 
    tx.set(
      statsRef,
      {
        "stats.total": increment(1),
        [`stats.visibility.${payload.visibility}`]: increment(1),
        [`stats.category.${payload.category}`]: increment(1),
        [`stats.mode.${modeKey}`]: increment(1),
        [`stats.ym.${ymKey}`]: increment(1),
      },
      { merge: true }
    );

    
  });

  return roomRef.id;
};
