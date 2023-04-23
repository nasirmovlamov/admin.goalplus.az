import { createContext } from "vm";
import toast from "react-hot-toast";
import React from "react";
export type AuthContextData = {
  user: UserDto | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (email: string, password: string) => Promise<void>;
  authLoading: boolean;
  authError: string | null;
};

const AuthContext = createContext({} as AuthContextData);

export type LoginDto = {
  email: string;
  password: string;
};

export type UserDto = {
  email: string;
  password: string;
  id: string;
};

export type JwtDto = {
  accessToken: string;
  refreshToken: string;
};


const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState<UserDto | null>(null);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [authError, setAuthError] = React.useState(null);

  const login = async (data: LoginDto) => {
    try {
      const response = await fetch(
        "https://61ae2fa9a7c7f3001786f6e6.mockapi.io/users-backend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const json = await response.json();
      if (!response.ok) throw new Error(json.message);
      console.log(json);
      toast.success("You are logged in");
      return json;
    } catch (error: any) {
      toast.error(error.message);
      setAuthError(error);
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch(
        "https://61ae2fa9a7c7f3001786f6e6.mockapi.io/users-backend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const json = await response.json();
      if (!response.ok) throw new Error(json.message);
      console.log(json);
      toast.success("You are registered");
      return json;
    } catch (error: any) {
      toast.error(error.message);
      setAuthError(error);
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
        authLoading,
        authError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
