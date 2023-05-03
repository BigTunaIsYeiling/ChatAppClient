import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const SERVER_URL = "http://localhost:5000";

const initialState = {
  users: null,
  status: "idle",
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
      state.status="succeeded"
    });
    builder.addCase(GetUsers.rejected, (state, action) => {
      state.users = null;
      state.status="failed"
    });
  },
});

export const UsersListReducer = UsersListSlice.reducer;
export const status = (state) => state.UsersListReducer.status;
export const users = (state) => state.UsersListReducer.users;
