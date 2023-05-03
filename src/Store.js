import { configureStore } from "@reduxjs/toolkit";
import { UserReducer } from "./ReduxSlices/User";
import { UsersListReducer } from "./ReduxSlices/UsersList";
import { ConversationReducer } from "./ReduxSlices/ConversationSlice";
import { MessagesReducer } from "./ReduxSlices/MessagesSlice";
export const Store = configureStore({
  reducer: {
    UserReducer,
    UsersListReducer,
    ConversationReducer,
    MessagesReducer
  },
});
