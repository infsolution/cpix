import { FormLoginParams, FormSigninParams } from "@/app/Type/interfaces";
import React, {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import * as authService from "@/shared/services/c-pix/auth.service";
import { IPlan, IUser } from "@/shared/interfaces/user-interface";
import {
  getStorageUser,
  removeItem,
  setJWT,
  setStorageUser,
} from "@/shared/storage/service/user";
import { clearStorage } from "@/shared/storage/service/general";
import { useOneSignal } from "@/shared/hooks/useOneSignal";
import * as Notifications from "expo-notifications";
import { useSettings } from "@/shared/hooks/useSettings";
type AuthContextType = {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  handleLogin: (params: FormLoginParams) => Promise<IUser | null>;
  handleSignin: (params: FormSigninParams) => Promise<IUser | null>;
  restoreUserSession: () => Promise<IUser | null>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const { playerId } = useOneSignal();
  const { getSettings, setSettings } = useSettings();
  const handleSignin = async (
    userData: FormSigninParams,
  ): Promise<IUser | null> => {
    userData.playerId = playerId ?? "";

    const { message, code, data } = await authService.register(userData);
    if (data.token) {
      setJWT("user-jwt", data.token);
      setStorageUser("user-data", data);
    }
    return data;
  };

  const handleLogin = async (userData: FormLoginParams) => {
    userData.player_id = playerId;
    const hasPermission = await Notifications.getPermissionsAsync();
    const { message, code, data } = await authService.authenticate(userData);
    const settings = await getSettings(data);
    if (data.token) {
      setJWT("user-jwt", data.token);
      setStorageUser("user-data", data);
      if (!settings) {
        setSettings(data, {
          lastInteractionNotification: undefined,
          authorizationBackup: false,
        });
      }
      return data;
    }
    return null;
  };

  const restoreUserSession = async () => {
    const userData = await getStorageUser("user-data");
    if (userData) {
      setUser(userData);
    }
    return userData;
  };

  const handleLogout = () => {
    clearStorage();
    setUser(null);
    removeItem("user-jwt");
    removeItem("user-data");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleSignin,
        handleLogin,
        handleLogout,
        restoreUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider",
    );
  }
  return context;
};
