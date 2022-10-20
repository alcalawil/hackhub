import { useContext } from 'react';
import AppContext from '../contexts/app';

export const useApp = () => {
    const {
        isOpenTopbar,
        setIsOpenTopbar
    } = useContext(AppContext);

    return {
        isOpenTopbar,
        setIsOpenTopbar
    }
}