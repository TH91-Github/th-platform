import { doc, increment } from 'firebase/firestore';
import { Firestore, Transaction } from 'firebase/firestore';
import type { HubRoomType } from '@/types/hub/hubDB';
import type { UserRoomsType } from '@/types/hub/hubDB';
import { isColName } from '@/utils/hun/common';

// 🔹 방 생성 시 유저 관련 필드 & 컬렉션
export const addUserRoom = (
  tx: Transaction,
  db: Firestore,
  room: HubRoomType,
  isGuest: boolean
) => {
  const collection = isColName(isGuest,'userRooms');
  const uid = room.owner.uid;
  const userRef = doc(db, `${collection}/${uid}`);
  const roomRef = doc(db, `${collection}/${uid}/rooms/${room.id}`);
  const memberPreview = room.members.slice(0, 4).map((member) => ({
    uid: member.uid,
    nickName: member.nickName,
    imgSrc: member.imgSrc,
  }));

  // 방 개별 요약 정보 
  const userRoomData: UserRoomsType = {
    id: room.id,
    title: room.title,
    desc: room.desc,
    category: room.category,
    visibility: room.visibility,
    createdAt: room.createdAt,
    owner: room.owner,
    role: 'owner', // 내가 만든 방
    favorite: false,
    memberCount: room.members.length, // 4명 정도만 간략하게
    memberPreview // 불러오는 4명 [{...}]
  };

  const modeKey = room.members.length > 1 ? "team" : "single";

  // 방 요약 저장
  tx.set(roomRef, userRoomData);
  // stats 증가
  tx.set(
    userRef,
    {
      stats: {
        total: increment(1),
        [room.visibility]: increment(1),
        [modeKey]: increment(1),
        [`category.${room.category}`]: increment(1),
      },
    },
    { merge: true }
  );
};


// 🔺 삭제 진행 시 확인 필요 유저 개별 방 삭제
export const removeUserRoom = (
  tx: Transaction,
  db: Firestore,
  room: UserRoomsType,
  uid: string,
  isGuest: boolean
) => {

  const collection = isColName(isGuest,'userRooms');
  const userRef = doc(db, `${collection}/${uid}`);
  const roomRef = doc(db, `${collection}/${uid}/rooms/${room.id}`);
  const modeKey = room.memberCount > 1 ? "team" : "single";

  tx.delete(roomRef);
  tx.set(
    userRef,
    {
      stats: {
        total: increment(-1),
        [room.visibility]: increment(-1),
        [modeKey]: increment(-1),
        [`category.${room.category}`]: increment(-1),
      },
    },
    { merge: true }
  );
};

// 🔺 즐겨찾기 작업 시 재확인 및 수정 필요
export const toggleUserRoomFavorite = (
  tx: Transaction,
  db: Firestore,
  room: UserRoomsType,
  uid: string,
  isGuest: boolean
) => {

  const collection = isColName(isGuest,'userRooms');
  const roomRef = doc(db, `${collection}/${uid}/rooms/${room.id}`);
  const userRef = doc(db, `${collection}/${uid}`);
  const nextFavorite = !room.favorite;
  const inc = nextFavorite ? 1 : -1;

  tx.update(roomRef, {
    favorite: nextFavorite,
  });

  tx.set(
    userRef,
    {
      stats: {
        bookmark: {
          total: increment(inc),
          [room.visibility]: increment(inc),
        },
      },
    },
    { merge: true }
  );
};