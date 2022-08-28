import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
  useCallback,
} from "react";
import IUser from "../domains/user";

export interface IUserContextValue {
  userData: IUser | null;
  setUserData(user: IUser): void;
  deleteUserData(): void;
}

// this merely to demonstrate useContext
export const UserContext = createContext<IUserContextValue>({
  userData: null,
  setUserData(): void {
    console.error("Please add provider to App root");
  },
  deleteUserData(): void {
    console.error("Please add provider to App root");
  },
});

export const useUserContext = () => useContext(UserContext);

interface IUserContextProvider {
  children: ReactNode;
}

export const UserContextProvider = (props: IUserContextProvider) => {
  const { children } = props;
  const [userData, setUserData] = useState<IUser | null>(null);
  const deleteUserData = useCallback(() => setUserData(null), []);

  const value = useMemo(
    () => ({ deleteUserData, userData, setUserData }),
    [deleteUserData, userData]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
