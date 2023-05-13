import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CustomTheme } from "../Theme";
import { GoPrimitiveDot } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { Createconversation } from "../ReduxSlices/ConversationSlice";
import { useNavigate } from "react-router-dom";
import { ActiveUsers } from "../ReduxSlices/UsersList";
export const User = ({ name, avatar, id }) => {
  const dispatch = useDispatch();
  const { fonts } = CustomTheme;
  const navigate = useNavigate();
  const OnlineUsers = useSelector(ActiveUsers);
  return (
    <ListItem disablePadding sx={{ width: 240 }}>
      <ListItemButton
        onClick={() => {
          dispatch(Createconversation(id)).then((data) => {
            navigate(`/chat/${data.payload._id}/${id}`);
          });
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt="Remy Sharp"
            src={avatar}
            sx={{ width: 30, height: 30 }}
          />
        </ListItemAvatar>
        <ListItemText
          sx={{
            "&.MuiListItemText-root,.MuiTypography-root": {
              fontFamily: fonts.header,
              color: "white",
              fontSize: "13px",
              fontWeight: 500,
            },
            paddingRight: "15px",
          }}
          primary={name}
        />
        <GoPrimitiveDot
          color={
            // if  user is online then green else red
            OnlineUsers&& OnlineUsers.some((user) => user.userId === id) ? "#38E54D" : "#777"
          }
          size={20}
        />
      </ListItemButton>
    </ListItem>
  );
};
