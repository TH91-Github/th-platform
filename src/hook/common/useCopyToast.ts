
import { useAddToast, type ToastType } from '@/store/zustand/common/toastStore';
import { copyClipboard } from '@/utils/common';

interface CopyToastOptions {
  successMessage?: string, // 복사 성공 시 message
  errorMessage?: string, // 실패 message
  type?: ToastType, // Toast 타입
}

export const useCopyToast = () => {
  const addToast = useAddToast();

  const copy = async ( value: string, options?: CopyToastOptions) => {
    const success = await copyClipboard(value);

    addToast(
      success
        ? options?.successMessage ?? '복사를 성공했어요.'
        : options?.errorMessage ?? '복사를 실패했어요.. 😢',
      success
        ? options?.type ?? 'base'
        : 'error'
    );
    return success;
  };

  return { copy };
};

/*
   const { copy } = useCopyToast();
   1 : copy(value);
    copy(value, {
      successMessage: 'message',
      successType: 'success',
      type: success,
    });
*/ 