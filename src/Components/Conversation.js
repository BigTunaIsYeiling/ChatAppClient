import {
  Avatar,
  Badge,
  Box,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { CustomTheme } from "../Theme";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import { useNavigate } from "react-router-dom";
const { fonts } = CustomTheme;
export const Conversation = ({
  name,
  avatar,
  time,
  unread,
  lastMessage,
  id,
  receiverId,
}) => {
  const navigate = useNavigate();
  return (
    <ListItem disablePadding>
      <ListItemButton
        onClick={() => {
          navigate(`/chat/${id}/${receiverId}`);
        }}
      >
        <ListItemAvatar>
          <Badge
            color="success"
            overlap="circular"
            badgeContent={unread}
            invisible={unread === 0}
          >
            <Avatar
              alt="Remy Sharp"
              src={avatar}
              sx={{ width: 30, height: 30 }}
            />
          </Badge>
        </ListItemAvatar>
        <ListItemText
          primary={name}
          secondary={
            <Box color={"#777"} fontFamily={fonts.header}>
              {lastMessage.length > 45
                ? lastMessage.substring(0, 45) + "..."
                : lastMessage}
            </Box>
          }
        />
        <Box fontFamily={fonts.hom} fontSize={12}>
          <ReactTimeAgo
            date={Date.parse(time)}
            timeStyle="twitter"
            locale="en-US"
          />
        </Box>
      </ListItemButton>
    </ListItem>
  );
};
