
import type { AppDispatch, RootState } from '@/store/redux/store';
import { useDispatch, useSelector, type TypedUseSelectorHook} from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
