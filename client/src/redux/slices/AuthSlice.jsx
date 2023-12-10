import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../config/axios";

const initialState = {
  credential: {
    user: "",
    token: "",
  },
  status: "idle",
  error: null,
};

// AutSlice will be able to make thunk calls

export const login = createAsyncThunk("login", async (credential) => {
  const response = await axios.post("/auth", credential);
  console.log(response);
  const data = await response.data;
  return data;
});

export const logout = createAsyncThunk("logout", async () => {
  const response = await axios.post("/auth/logout", { username: "Dalin" });
  const data = await response.data;
  // console.log(response);
  return data;
});

// userefreshtoken and obtain new accesstoken
export const refreshtoken = createAsyncThunk("refresh", async () => {
  const response = await axios.get("/refresh");
  const data = await response.data;

  return data;
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "success";
        const { accesstoken: token, username } = action.payload;
        state.credential.user = username;
        state.credential.token = token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "error";

        console.log(action);
        throw new Error("There is an error during login");
      })
      .addCase(logout.pending, (state) => {})
      .addCase(logout.fulfilled, (state, action) => {
        // console.log(action);
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "error";

        console.log(action);
        throw new Error("There is an error during logout");
      })
      // refreshtoken
      .addCase(refreshtoken.pending, (state) => {})
      .addCase(refreshtoken.fulfilled, (state, action) => {
        const { accesstoken } = action.payload;
        state.credential.token = accesstoken;
      })
      .addCase(refreshtoken.rejected, (state, action) => {
        state.status = "error";

        console.log(action);
        throw new Error("There is an error during logout");
      });
  },
});

// State abtruction

export const getCredential = (state) => state.auth.credential;
export const getStatus = (state) => state.auth.status;
export const getError = (state) => state.auth.error;

// Export reducer

export const { resetStatus, setAuth } = authSlice.actions;

export default authSlice.reducer;
