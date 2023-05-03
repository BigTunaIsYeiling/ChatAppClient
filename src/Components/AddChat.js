import { Dialog, IconButton, Stack } from "@mui/material";
import { useState } from "react";
import { UsersList } from "./UsersList";
import { GrFormAdd } from "react-icons/gr";
export const AddChat = () => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        sx={{
          position: "fixed",
          right: "10px",
          top: "80%",
          backgroundColor: "#fff",
          ":hover": {
            backgroundColor: "#fff",
          },
          display: { xs: "flex", md: "none" },
          zIndex: "999",
        }}
        onClick={handleClickOpen}
        size="large"
      >
        <GrFormAdd />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor:
              "#2b2d31",
          },
        }}
      >
        <Stack direction={"column"} overflow={"hidden"}>
          <UsersList />
        </Stack>
      </Dialog>
    </>
  );
};
