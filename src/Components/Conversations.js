import { AppBar, Box, List, Toolbar } from "@mui/material";
import { CustomTheme } from "../Theme";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../UseWindowHook";
import { Conversation } from "./Conversation";
import { useSelector } from "react-redux";
import { Allconversations } from "../ReduxSlices/ConversationSlice";
import { ConversationSkeleton } from "./ConversationSkeleton";
import { NoConversations } from "./NoConversations";
export const Conversations = () => {
  const { fonts } = CustomTheme;
  const conversationsData = useSelector(Allconversations);
  const [headerHeight, setHeaderHeight] = useState(0);
  const setHeight = () => {
    setHeaderHeight(headRef.current.clientHeight);
  };
  const size = useWindowSize();
  useEffect(() => {
    setHeight();
    // eslint-disable-next-line
  }, [size.width]);
  const headRef = useRef();
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#313338",
        height: "100%",
      }}
    >
      <Box sx={{ flexGrow: 1, zIndex: 1 }} ref={headRef}>
        <AppBar
          position="relative"
          sx={{
            backgroundColor: "#313338",
            "&.MuiPaper-root": {
              boxShadow:
                "0px 2px 0px -13px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Toolbar>
            <Box fontFamily={fonts.header} p={2}>
              Conversations
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {conversationsData === null ? (
        <>
          <ConversationSkeleton />
          <ConversationSkeleton />
          <ConversationSkeleton />
          <ConversationSkeleton />
        </>
      ) :  conversationsData.length > 0 ? (
        <List
          sx={{
            width: "100%",
            overflowY: "auto",
            height: `calc(100% - ${headerHeight}px)`,
            paddingTop: "5px",
          }}
          className="scroll"
        >
          {conversationsData.map((conversation) => (
            <Conversation
              key={conversation.id}
              name={conversation.receiverName}
              avatar={conversation.receiverAvatar}
              time={conversation.updatedAt}
              unread={conversation.unseen_messages}
              lastMessage={conversation.last_message}
              id={conversation.id}
              receiverId={conversation.receiverId}
            />
          ))}
        </List>
      ) : (
        <NoConversations />
      )}
    </Box>
  );
};
