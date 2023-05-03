import {
  AppBar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
  Toolbar,
} from "@mui/material";
import { CustomTheme } from "../Theme";
import { User } from "./User";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUsers, status, users } from "../ReduxSlices/UsersList";
import { React } from "react";
export const UsersList = () => {
  const { fonts } = CustomTheme;
  const UsersStatus = useSelector(status);
  const Users = useSelector(users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetUsers());
    // eslint-disable-next-line
  }, []);
  const [Search, setSearch] = useState("");
  return (
    <>
      <Box sx={{ flexGrow: 1, zIndex: 100 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#2b2d31",
            "&.MuiPaper-root": {
              boxShadow:
                "0px 2px 0px -13px rgba(0,0,0,0.2), 0px 1px 0px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
            },
          }}
        >
          <Toolbar disableGutters sx={{ paddingX: "10px" }}>
            <Box
              component="input"
              sx={{
                backgroundColor: "#1e1f22",
                borderRadius: "2px",
                padding: "5px",
                width: "100%",
                border: "0",
                outline: "none",
                color: "white",
                fontFamily: fonts.hom,
                "::placeholder": {
                  color: "whitesmoke",
                  fontFamily: fonts.header,
                  fontWeight: 400,
                },
                paddingY: "10px",
              }}
              placeholder="Search or start a new chat..."
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Toolbar>
        </AppBar>
      </Box>
      <List
        sx={{
          width: "100%",
          overflowY: "auto",
          height: "100%",
          paddingTop: "5px",
          backgroundColor: "#2b2d31",
        }}
        className="scroll"
      >
        {UsersStatus !== "succeeded" ? (
          <>
            <ListItem sx={{ width: 240 }} disablePadding>
              <ListItemButton disabled>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText>
                  <Skeleton variant="text" width={120} height={20} />
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton disabled>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText>
                  <Skeleton variant="text" width={120} height={20} />
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton disabled>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText>
                  <Skeleton variant="text" width={120} height={20} />
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton disabled>
                <ListItemAvatar>
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemAvatar>
                <ListItemText>
                  <Skeleton variant="text" width={120} height={20} />
                </ListItemText>
              </ListItemButton>
            </ListItem>
          </>
        ) : (
          Users.filter((user) =>
            user.username.toLowerCase().includes(Search.toLowerCase())
          ).map((user) => {
            return (
              <User
                key={user._id}
                name={user.username}
                avatar={user.avatar.url}
                id={user._id}
              />
            );
          })
        )}
      </List>
    </>
  );
};
