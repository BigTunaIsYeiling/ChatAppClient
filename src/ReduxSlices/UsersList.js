import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const SERVER_URL = "https://chatbtserver.onrender.com";

const initialState = {
  users: null,
  status: "idle",
  ActiveUsers: null,
};

export const GetUsers = createAsyncThunk("users/get", async (_, thunkAPI) => {
  const { rejectWithValue } = thunkAPI;
  try {
    const res = await axios.get(`${SERVER_URL}/users/`);
    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const UsersListSlice = createSlice({
  name: "usersList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(GetUsers.fulfilled, (state, action) => {
      state.users = action.payload;
      state.status = "succeeded";
    });
    builder.addCase(GetUsers.rejected, (state, action) => {
      state.users = null;
      state.status = "failed";
    });
  },
  reducers: {
    setActiveUsers: (state, action) => {
      state.ActiveUsers = action.payload;
    },
  },
});

export const UsersListReducer = UsersListSlice.reducer;
export const { setActiveUsers } = UsersListSlice.actions;
export const status = (state) => state.UsersListReducer.status;
export const users = (state) => state.UsersListReducer.users;
export const ActiveUsers = (state) => state.UsersListReducer.ActiveUsers;
