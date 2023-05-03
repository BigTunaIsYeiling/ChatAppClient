import {
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Skeleton,
} from "@mui/material";
export const ConversationSkeleton = () => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Skeleton variant="circular" width={40} height={40} />
        </ListItemAvatar>
        <ListItemText
          primary={<Skeleton variant="text" width={"10%"} height={20} />}
          secondary={<Skeleton variant="text" width={"70%"} height={20} />}
        />
        <Skeleton variant="text" width={30} height={20} />
      </ListItemButton>
    </ListItem>
  );
};
