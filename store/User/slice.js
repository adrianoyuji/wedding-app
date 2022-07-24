import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../services/agent";
import { setBearerToken } from "../../services/agent";
const initialState = {
  user: null,
  status: "idle",
  token: null,
  authenticated: false,
};

export const authenticateUser = createAsyncThunk(
  "user/authenticateUser",
  async ({ username, password }) => {
    return await agent.User.login(username, password);
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      localStorage.removeItem("access");
      state = { ...initialState };
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(authenticateUser.fulfilled, (state, action) => {
        state.status = "success";
        state.user = { ...action.payload.user };
        state.token = action.payload.token;
        state.authenticated = true;
        setBearerToken(action.payload.token);
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.status = "failed";
        state.user = null;
        state.authenticated = false;
      }),
});

export const { logOut } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
