import { createContext, useState, ReactNode, useContext } from 'react';

interface User {
    uid: string;
    email: string;
    username?: string;
}

interface UserConfig {
    user: User | null;
    setUser: (user: User) => void;
}

export const UserContext = createContext<UserConfig | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
