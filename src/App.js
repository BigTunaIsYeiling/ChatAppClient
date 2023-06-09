import "./style.scss";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isloading, isLoggedIn, RefreshAccess } from "./ReduxSlices/User";
import { Box, Stack } from "@mui/material";
import { Header } from "./Components/Header";
import { UsersList } from "./Components/UsersList";
import { Getconversations } from "./ReduxSlices/ConversationSlice";
import { getMessages } from "./ReduxSlices/MessagesSlice";
import { UserId } from "./ReduxSlices/User";
import { setActiveUsers } from "./ReduxSlices/UsersList";
import { socket } from "./Socket";
import Lottie from "lottie-react";
import LoadingAni from "./Components/合成 1.json";
function App() {
  const user = useSelector(UserId);
  useEffect(() => {
    user && socket.emit("addUser", user);
    // eslint-disable-next-line
  }, [user]);
  useEffect(() => {
    socket.on("getUsers", (data) => {
      dispatch(setActiveUsers(data));
    });
    // eslint-disable-next-line
  }, [socket]);
  const [headerHeight, setHeaderHeight] = useState(0);
  const isSigned = useSelector(isLoggedIn);
  const loaded = useSelector(isloading);
  const dispatch = useDispatch();
  // run refresh access on load and every 5 seconds
  useEffect(
    () => {
      dispatch(RefreshAccess());
      const interval = setInterval(() => {
        dispatch(RefreshAccess());
      }, 5000);
      return () => clearInterval(interval);
    },
    // eslint-disable-next-line
    []
  );
  useEffect(() => {
    dispatch(Getconversations());
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    dispatch(getMessages());
    // eslint-disable-next-line
  }, []);
  const ReceiveHandler = () => {
    dispatch(Getconversations());
    dispatch(getMessages());
  };
  useEffect(() => {
    socket.on("receive-message", ReceiveHandler);
    return () => socket.off("receive-message", ReceiveHandler);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    user && socket.emit("login", user);
  }, [user]);
  return loaded ? (
    !isSigned ? (
      <Navigate to="register" />
    ) : (
      <Box>
        <Header setHeaderHeight={setHeaderHeight} />
        <Stack
          sx={{
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            overflow: "hidden",
          }}
          direction={"row"}
        >
          <Stack
            direction={"column"}
            display={{ xs: "none", md: "flex" }}
            bgcolor={"#2b2d31"}
            marginTop={`${headerHeight}px`}
            maxHeight={`calc(100vh - ${headerHeight}px)`}
          >
            <UsersList />
          </Stack>
          <Box
            flexGrow={1}
            marginTop={`${headerHeight}px`}
            maxHeight={`calc(100vh - ${headerHeight}px)`}
          >
            <Outlet />
          </Box>
        </Stack>
      </Box>
    )
  ) : (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
      <Box
        component={Lottie}
        animationData={LoadingAni}
        style={{ width: "400px" }}
      />
    </Stack>
  );
}
export default App;
