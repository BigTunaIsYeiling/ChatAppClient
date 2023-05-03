import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const SERVER_URL = "http://localhost:5000";

export const SetLogin = createAsyncThunk(
  "users/login",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`${SERVER_URL}/users/login`, user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SetRegister = createAsyncThunk(
  "users/register",
  async (user, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`${SERVER_URL}/users/Register`, user);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const SetLogout = createAsyncThunk(
  "users/logout",

  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`${SERVER_URL}/users/LogOut`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const RefreshAccess = createAsyncThunk(
  "users/refresh",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`${SERVER_URL}/users/Refresh`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const DeleteUser = createAsyncThunk(
  "users/delete",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.delete(`${SERVER_URL}/users/DeleteUser`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const UpdateUser = createAsyncThunk(
  "users/update",
  async (data, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.put(`${SERVER_URL}/users/UpdateUser`, data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  isLoggedIn: false,
  status: null,
  errors: null,
  loaded: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(SetLogin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(SetLogout.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(SetLogout.rejected, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(SetRegister.fulfilled, (state, action) => {
        state.isLoggedIn = true;
      })
      .addCase(RefreshAccess.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.loaded = true;
      })
      .addCase(RefreshAccess.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
        state.loaded = true;
      })
      .addCase(DeleteUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = null;
      })
      .addCase(DeleteUser.rejected, (state, action) => {
        state.isLoggedIn = true;
      });
  },
});

export const UserReducer = userSlice.reducer;
export const isLoggedIn = (state) => state.UserReducer.isLoggedIn;
export const userData = (state) => state.UserReducer.user;
export const isloading = (state) => state.UserReducer.loaded;
export const UserId = (state) => state.UserReducer.user.id;
