import React from 'react';

const UserContext = React.createContext();  

export const UserStorage = ({ children }) => {
    const [data, setData] = React.useState(null);
    return (
        <UserContext.Provider value={{ data, setData }}>
            {children}
        </UserContext.Provider>
    );
}