import { useEffect, useRef, useState } from "react";
import { CustomTheme } from "../Theme";
import useWindowSize from "../UseWindowHook";
import { AppBar, Avatar, Box, IconButton, Stack, Toolbar } from "@mui/material";
import { BsArrow90DegLeft } from "react-icons/bs";
import { TbSend } from "react-icons/tb";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ActiveUsers, users } from "../ReduxSlices/UsersList";
import {
  AllMessages,
  MessagesStatus,
  getMessages,
  seenMessages,
  sendMessage,
} from "../ReduxSlices/MessagesSlice";
import { Getconversations } from "../ReduxSlices/ConversationSlice";
import { UserId } from "../ReduxSlices/User";
import { socket } from "../Socket";
export const ChattingRoom = () => {
  const [typingStatus, settypingStatus] = useState(false);
  const user = useSelector(UserId);
  const { fonts } = CustomTheme;
  const dispatch = useDispatch();
  const [headerHeight, setHeaderHeight] = useState(0);
  const [receiver, setReceiver] = useState(null);
  const [Messages, setMessages] = useState([]);
  const usersData = useSelector(users);
  const MessagesData = useSelector(AllMessages);
  const status = useSelector(MessagesStatus);
  const setHeight = () => {
    setHeaderHeight(headRef.current.clientHeight);
  };
  const size = useWindowSize();
  useEffect(() => {
    setHeight();
    // eslint-disable-next-line
  }, [size.width]);
  const headRef = useRef();
  // get chat id from router params
  const { ChatId, ReceiverId } = useParams();
  useEffect(() => {
    usersData && setReceiver(usersData.find((user) => user._id === ReceiverId));
  }, [usersData, ReceiverId]);
  useEffect(() => {
    status === "succeeded" &&
      setMessages(MessagesData.filter((m) => m.conversationId === ChatId));
  }, [ChatId, status, MessagesData]);
  const [text, setText] = useState("");
  const formatDate = (date) => {
    // display date in hh:mm pm format
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    let hours12 = hours % 12;
    hours12 = hours12 || 12; // the hour '0' should be '12'
    const minutes12 = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours12 + ":" + minutes12 + " " + ampm;
    return strTime;
  };
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(seenMessages(ChatId)).then(() => {
      dispatch(getMessages()).then(() => {
        dispatch(Getconversations());
      });
    });
    // eslint-disable-next-line
  }, []);
  const container = useRef();
  useEffect(() => {
    container.current.scrollTop = container.current.scrollHeight;
  });
  const sendMessageHandler = () => {
    dispatch(sendMessage({ text, conversationId: ChatId })).then(() => {
      socket.emit("send-message", ReceiverId);
      dispatch(getMessages());
      dispatch(Getconversations());
    });
    setText("");
  };
  const getMessageSeen = () => {
    dispatch(seenMessages(ChatId)).then(() => {
      dispatch(getMessages()).then(() => {
        dispatch(Getconversations());
      });
    });
  };
  useEffect(() => {
    socket.on("receive-message", getMessageSeen);
    return () => socket.off("receive-message", getMessageSeen);
    // eslint-disable-next-line
  }, []);
  const OnlineUsers = useSelector(ActiveUsers);
  const onTyping = () => {
    socket.emit("typing", ReceiverId);
  };
  const handleTyping = () => {
    settypingStatus(true);
  };
  useEffect(() => {
    socket.on("typing", handleTyping);
    return () => socket.off("typing", handleTyping);
    // eslint-disable-next-line
  }, []);
  const onTStopyping = () => {
    socket.emit("stopTyping", ReceiverId);
  };
  const handleStopTyping = () => {
    settypingStatus(false);
  };
  useEffect(() => {
    socket.on("stopTyping", handleStopTyping);
    return () => socket.off("stopTyping", handleStopTyping);
    // eslint-disable-next-line
  }, []);
  var typingtimer;
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
          position="static"
          sx={{
            backgroundColor: "#313338",
            "&.MuiPaper-root": {
              boxShadow:
                "0px 2px 0px -13px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Toolbar>
            <Stack direction={"row"} alignItems={"center"} spacing={1}>
              <IconButton
                size="small"
                onClick={() => {
                  navigate("/");
                }}
              >
                <BsArrow90DegLeft color="white" />
              </IconButton>
              {receiver && (
                <Avatar
                  alt="Remy Sharp"
                  src={receiver.avatar.url}
                  sx={{ width: 30, height: 30 }}
                />
              )}
              {receiver && (
                <Box
                  sx={{
                    fontFamily: fonts.header,
                    color: "white",
                    fontSize: "13px",
                    fontWeight: 500,
                  }}
                >
                  {receiver.username}
                  <Box fontWeight={300} fontSize={"10px"}>
                    {OnlineUsers &&
                    OnlineUsers.some((user) => user.userId === ReceiverId)
                      ? "online"
                      : "offline"}
                  </Box>
                </Box>
              )}
            </Stack>
          </Toolbar>
        </AppBar>
      </Box>
      <Box
        sx={{
          zIndex: 100,
          position: "absolute",
          bottom: "4px",
          left: 0,
          width: "100%",
        }}
        ref={headRef}
      >
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#313338",
            "&.MuiPaper-root": {
              boxShadow:
                "0px 2px 0px -13px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Toolbar>
            <Box
              component="input"
              sx={{
                backgroundColor: "#383a40",
                borderRadius: "2px",
                padding: "13px",
                border: "0",
                outline: "none",
                color: "white",
                fontFamily: fonts.arabic,
                "::placeholder": {
                  color: "whitesmoke",
                  fontFamily: fonts.header,
                  fontWeight: 400,
                  opacity: 0.7,
                },
                width: { xs: "200px", md: "300px" },
                fontSize: "12px",
                flexGrow: 1,
              }}
              placeholder="Type a message"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                onTyping();
                if (e.key === "Enter") {
                  onTStopyping();
                  sendMessageHandler();
                }
                clearTimeout(typingtimer);
              }}
              onKeyUp={() => {
                clearTimeout(typingtimer);
                typingtimer = setTimeout(() => {
                  onTStopyping();
                }, 1000);
              }}
            />
            <IconButton onClick={sendMessageHandler}>
              <TbSend color="white" />
            </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
      <Stack
        direction={"column"}
        sx={{
          width: "100%",
          overflowY: "auto",
          height: `calc(100% - ${headerHeight * 2}px)`,
          position: "relative",
          padding: "10px",
        }}
        className="scroll"
        spacing={1}
        ref={container}
      >
        {Messages &&
          Messages.map((message) => (
            <Stack
              direction={"column"}
              spacing={"5px"}
              alignSelf={user === message.sender ? "flex-end" : "flex-start"}
              sx={{ maxWidth: { xs: "50%", sm: "40%" } }}
              key={message._id}
              alignItems={user === message.sender ? "flex-end" : "flex-start"}
            >
              <Box
                bgcolor={"#1e1f22"}
                padding={2}
                sx={{
                  borderRadius: "10px 10px 10px 0",
                  fontFamily: fonts.arabic,
                  color: "white",
                  fontSize: "13px",
                  fontWeight: 500,
                }}
              >
                {message.text}
              </Box>
              <Box
                sx={{
                  fontFamily: fonts.header,
                  color: "white",
                  fontSize: "11px",
                  fontWeight: 500,
                }}
              >
                {formatDate(message.createdAt)}
              </Box>
            </Stack>
          ))}
        {typingStatus && (
          <Box
            bgcolor={"#1e1f22"}
            padding={2}
            sx={{
              borderRadius: "10px 10px 10px 0",
              fontFamily: fonts.arabic,
              color: "white",
              fontSize: "13px",
              fontWeight: 500,
            }}
            alignSelf={"flex-start"}
          >
            {receiver.username} is typing...
          </Box>
        )}
      </Stack>
    </Box>
  );
};
