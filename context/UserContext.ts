import { createContext } from 'react';

export interface UserContextProps {
    user?: User;
    setUser: (u?: User) =>void;
}

const UserContext = createContext<Partial<UserContextProps>>({});

export default UserContext;
