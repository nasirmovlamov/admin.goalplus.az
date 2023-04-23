import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { JwtDto } from "@/context/AuthContext";

export interface AuthState {
  jwt: JwtDto | null;
  user: any;
}

const initialState: AuthState = {
  jwt: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserNull: (state) => {
      state.user = null;
    },

    setJwtNull: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      state.jwt = null;
    },

    getTokenFromStorage: (state) => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");
      if (accessToken && refreshToken) {
        state.jwt = {
          accessToken: accessToken,
          refreshToken: refreshToken,
        };
      }
    },

    getUserFromStorage: (state) => {
      const userData = localStorage.getItem("userData");
      if (userData) {
        state.user = JSON.parse(userData);
      }
    },

    logoutUser: (state) => {
      state.user = null;
      state.jwt = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.authentication.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
        state.jwt = {
          accessToken: action.payload.accessToken,
          refreshToken: action.payload.refreshToken,
        };
        state.user = action.payload.user;
      }
    );

    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        if (action.payload) {
          state.jwt = {
            accessToken: action.payload.accessToken,
            refreshToken: action.payload.refreshToken,
          };
          state.user = action.payload.refreshToken;
        }
      }
    );
  },
});

export const { setUserNull, setJwtNull, getTokenFromStorage } =
  authSlice.actions;
