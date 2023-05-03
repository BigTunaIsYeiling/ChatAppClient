import {
  AppBar,
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
} from "@mui/material";
import { AiFillCamera } from "react-icons/ai";
import { CustomTheme } from "../Theme";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../UseWindowHook";
import { useNavigate } from "react-router-dom";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { RefreshAccess, UpdateUser, userData } from "../ReduxSlices/User";
import DeleteUserDialog from "./DeleteUser";
export const Settings = () => {
  const [showPass, setPass] = useState(false);
  const { fonts } = CustomTheme;
  const user = useSelector(userData);
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
  const navigate = useNavigate();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [file, setfile] = useState(null);
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#313338",
        height: "100%",
        boxSizing: "border-box",
        paddingBottom: { xs: 1, md: 0 },
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
            <IconButton
              size="small"
              onClick={() => {
                navigate("/");
              }}
            >
              <BsArrow90DegLeft color="white" />
            </IconButton>
            <Box fontFamily={fonts.header} p={2}>
              Settings
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Stack
        direction={"row"}
        justifyContent={"center"}
        paddingTop={1}
        paddingBottom={{ xs: 1, md: 0 }}
        sx={{
          width: "100%",
          overflowY: "auto",
          height: `calc(100% - ${headerHeight}px)`,
          paddingTop: "5px",
        }}
      >
        <Stack
          direction={"column"}
          alignItems={"center"}
          width={{ xs: "90%", md: "50%" }}
          spacing={5}
          component={"form"}
          encType="multipart/form-data"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData();
            data.append("newAvatar", file);
            data.append("newUsername", username);
            data.append("newPassword", password);
            dispatch(UpdateUser(data)).then(() => {
              dispatch(RefreshAccess());
            });
          }}
        >
          <Stack direction={"column"} alignItems={"center"}>
            <Box position={"relative"}>
              <Avatar
                alt="ad ads"
                sx={{ width: 100, height: 100 }}
                src={user.avatar}
              />
              <IconButton
                sx={{
                  position: "absolute",
                  left: "50%",
                  transform: "translate(-50%, 0)",
                  top: 0,
                  width: "100%",
                  height: "100%",
                }}
                component="label"
              >
                <AiFillCamera color="white" opacity={0.9} />
                <input
                  hidden
                  type="file"
                  onChange={(e) => setfile(e.target.files[0])}
                />
              </IconButton>
            </Box>
            <Box
              component={"p"}
              fontFamily={fonts.header}
              fontSize={{ xs: 15, md: 19 }}
              fontWeight={500}
            >
              {user.username}
            </Box>
            <Box
              component={"p"}
              fontFamily={fonts.header}
              fontSize={{ xs: 12, md: 14 }}
              fontWeight={400}
              sx={{ opacity: 0.7 }}
            >
              {user.email}
            </Box>
          </Stack>
          <Stack
            direction={"column"}
            alignItems={"flex-start"}
            alignSelf={"flex-start"}
            spacing={4}
          >
            <Stack direction={"row"} alignItems={"center"}>
              <Box
                component={"p"}
                fontFamily={fonts.header}
                fontSize={{ xs: 13, md: 14 }}
                minWidth={{ xs: "140px", md: "170px" }}
              >
                Change Username :
              </Box>
              <Box position={"relative"}>
                <Box
                  component="input"
                  sx={{
                    backgroundColor: "#1e1f22",
                    borderRadius: "2px",
                    padding: "5px",
                    border: "0",
                    outline: "none",
                    color: "white",
                    fontFamily: fonts.hom,
                    "::placeholder": {
                      color: "whitesmoke",
                      fontFamily: fonts.header,
                      fontWeight: 400,
                      opacity: 0.7,
                    },
                    marginBottom: "3px",
                    width: { xs: "200px", md: "300px" },
                    py: 1,
                    fontSize: "12px",
                  }}
                  // prevent input auto fill
                  autoComplete="off"
                  placeholder="New Username...."
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                />
              </Box>
            </Stack>
            <Stack direction={"row"} alignItems={"center"}>
              <Box
                component={"p"}
                fontFamily={fonts.header}
                fontSize={{ xs: 13, md: 14 }}
                minWidth={{ xs: "140px", md: "170px" }}
              >
                Change Password :
              </Box>
              <Box position={"relative"}>
                <Box
                  component={IconButton}
                  color="white"
                  sx={{
                    position: "absolute",
                    right: "0",
                    bottom: "1",
                    zIndex: "100",
                  }}
                  size="small"
                  onClick={() => setPass((prev) => !prev)}
                >
                  {showPass ? (
                    <Box component={AiFillEyeInvisible} color="white" />
                  ) : (
                    <Box component={AiFillEye} color="white" />
                  )}
                </Box>
                <Box
                  component="input"
                  sx={{
                    backgroundColor: "#1e1f22",
                    borderRadius: "2px",
                    padding: "5px",
                    border: "0",
                    outline: "none",
                    color: "white",
                    fontFamily: fonts.hom,
                    "::placeholder": {
                      color: "whitesmoke",
                      fontFamily: fonts.header,
                      fontWeight: 400,
                      opacity: 0.7,
                    },
                    marginBottom: "3px",
                    paddingRight: "28px",
                    width: { xs: "200px", md: "300px" },
                    py: 1,
                    fontSize: "12px",
                  }}
                  type={showPass ? "text" : "password"}
                  placeholder="New Password..."
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
              </Box>
            </Stack>
            <DeleteUserDialog />
          </Stack>
          <Button
            variant="outlined"
            sx={{
              color: "white",
              "&.MuiButton-outlined": { borderColor: "white" },
              alignSelf: "flex-end",
            }}
            type="submit"
          >
            Confirm
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};
