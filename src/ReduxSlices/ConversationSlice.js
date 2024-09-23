import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const SERVER_URL = "https://chatbt-production.up.railway.app";
const initialState = {
  conversations: null,
  status: "idle",
};
export const Getconversations = createAsyncThunk(
  "conversations/get",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.get(`${SERVER_URL}/conversations/`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const Createconversation = createAsyncThunk(
  "conversations/create",
  async (id, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axios.post(`${SERVER_URL}/conversations/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ConversationSlice = createSlice({
  name: "conversations",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(Getconversations.pending, (state) => {
        state.status = "loading";
      })
      .addCase(Getconversations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.conversations = action.payload;
      })
      .addCase(Getconversations.rejected, (state, action) => {
        state.status = "failed";
        state.conversations = null;
      });
  },
});

export const ConversationReducer = ConversationSlice.reducer;
export const status = (state) => state.ConversationReducer.status;
export const Allconversations = (state) =>
  state.ConversationReducer.conversations;
