import { useState } from "react";
import AppContext from '.';

const AppProvider = ({ children }) => {
    const [isOpenTopbar, setIsOpenTopbar] = useState(false);
    
    return (
        <AppContext.Provider value={{ 
            isOpenTopbar,
            setIsOpenTopbar
        }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;