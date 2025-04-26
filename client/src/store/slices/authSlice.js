import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const getValidToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decode = jwtDecode(token); // Decode the token to get the expiration time
    if (decode.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return null;
    }
    return token;
  } catch (error) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return null;
  }
};

const token = getValidToken();
const user = token ? JSON.parse(localStorage.getItem("user")) : null;

const initialState = {
  token: token,
  user: user,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
