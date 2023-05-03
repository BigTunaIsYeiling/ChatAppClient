import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;
const SERVER_URL = "http://localhost:5000";

const initialState = {
  messages: null,
  status: "idle",
};

export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.get(`${SERVER_URL}/messages`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const sendMessage = createAsyncThunk(
  "messages/sendMessage",
  async ({ text, conversationId }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.post(
        `${SERVER_URL}/messages/${conversationId}`,
        {text}
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const seenMessages = createAsyncThunk(
  "messages/seenMessages",
  async (conversationId, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await axios.put(
        `${SERVER_URL}/messages/seen/${conversationId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMessages.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(getMessages.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.messages = action.payload;
    });
    builder.addCase(getMessages.rejected, (state, action) => {
      state.status = "failed";
      state.error = null;
    });
  },
});

export const MessagesReducer = messagesSlice.reducer;
export const AllMessages = (state) => state.MessagesReducer.messages;
export const MessagesStatus = (state) => state.MessagesReducer.status;
