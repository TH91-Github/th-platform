import { auth, fireDB } from "@/firebase";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc, getDoc, runTransaction } from "firebase/firestore";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { actionUserLogout } from "@/store/redux/sliceActions";
import { clearSession, SESSION_KEY } from "@/utils/auth/session";
import { useAddToast } from "@/store/zustand/common/toastStore";

// 🔹 firebase user auth
export const useAuthAction = () => {
  const dispatch = useDispatch();
  const addToast = useAddToast();

  // 🔹 계정 삭제
  const removeAccount = useCallback(async () => {
    const user = auth.currentUser;

    if (!user) {
      addToast("유저 정보가 없습니다.", "error");
      return;
    }

    const uid = user.uid;

    try {
      const userSnap = await getDoc(doc(fireDB, "userDB", uid));
      const userData = userSnap.data();

      const fullID = userData?.simpleID;
      const baseID = fullID?.split("_")[0]; // _ 기준 (간편 아이디)

      // userDB 삭제
      await deleteDoc(doc(fireDB, "userDB", uid));

      // 간편 아이디 카운트 감소
      if (baseID) {
        const simpleRef = doc(fireDB, "userSimpleID", baseID);
        await runTransaction(fireDB, async (transaction) => {
          const snap = await transaction.get(simpleRef);

          if (!snap.exists()) return;

          const current = snap.data().currentCount ?? 0;
          const next = current - 1;

          if (next <= 0) {
            transaction.delete(simpleRef);
          } else {
            transaction.update(simpleRef, {
              currentCount: next,
            });
          }
        });
      }

      // 간편 아이디 삭제
      if (fullID) {
        await deleteDoc(doc(fireDB, "userSimpleID_list", fullID));
      }

      // firebase auth 삭제
      await deleteUser(user);

      dispatch(actionUserLogout());
      // 로컬 스토리지 platform 관련 삭제
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("platform")) {
          localStorage.removeItem(key);
        }
      });
      clearSession();

      addToast("계정이 삭제되었습니다.");
    } catch (error: any) {
      console.error("계정 삭제 실패:", error);

      if (error.code === "auth/requires-recent-login") {
        addToast("보안을 위해 다시 로그인 후 시도해주세요.", "error");
      } else {
        addToast("계정 삭제 중 오류가 발생했습니다.", "error");
      }
    }
  }, [dispatch, addToast]);

  return {
    removeAccount,
  };
};

