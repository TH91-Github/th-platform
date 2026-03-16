import { fireDB } from '@/firebase';
import type { HubRoomType, UserRoomsType } from '@/types/hub/firebase';
import { isColName } from '@/utils/hun/common';
import { collection, doc, Firestore, getDocs, increment, limit, orderBy, query, QueryConstraint, QueryDocumentSnapshot, startAfter, Transaction, type DocumentData } from 'firebase/firestore';

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
  const now = Date.now();
  const ymKey = new Date(now).toISOString().slice(0, 7); // "2026-03"
  const modeKey = room.maxMember > 1 ? "team" : "single";

  // 📘 userRooms/{uid}/필드 값 해당 유저 전체 통계
  tx.set(
    userRef,
    {
      "stats.total": increment(1),
      [`stats.visibility.${room.visibility}`]: increment(1),
      [`stats.category.${room.category}`]: increment(1),
      [`stats.mode.${modeKey}`]: increment(1),
      [`stats.ym.${ymKey}`]: increment(1),
      // 즐겨찾기
      "stats.bookmark.total": 0,
      "stats.bookmark.public": 0,
      "stats.bookmark.private": 0,
    },
    { merge: true }
  );

  // 📘 userRooms/{uid}/rooms/{roomId}/
  const roomRef = doc(db, `${collection}/${uid}/rooms/${room.id}`);
  const memberPreview = room.members.slice(0, 4).map((member) => ({
    uid: member.uid,
    nickName: member.nickName,
    imgSrc: member.imgSrc,
  }));
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
    memberCount: 4, // 4명 정도만 간략하게
    memberPreview // 불러오는 4명 [{...}]
  };

  tx.set(roomRef, userRoomData); 
  
  // UserRoomStats
};

// 🔹 유저가 만든 방 정보 가져오기
export const getUserRooms = async (
  uid: string,
  colName: string,
  lastDoc: QueryDocumentSnapshot<DocumentData> | null = null,
  limitNum: number = 10
): Promise<{ rooms: UserRoomsType[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> => {
  
  const roomsRef = collection(fireDB, colName, uid, "rooms");

  const constraints: QueryConstraint[] = [
    orderBy("createdAt", "desc"),
    orderBy("__name__", "desc"), // 2차 정렬 순 __name__ : Doc Id 기준 정렬
    ...(lastDoc ? [startAfter(lastDoc)] : []),
    limit(limitNum),
  ];

  const snap = await getDocs(query(roomsRef, ...constraints));

  return {
    rooms: snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as UserRoomsType)), // ✅
    lastDoc: snap.docs.at(-1) ?? null,
  };
};