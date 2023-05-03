import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { IoMdClose } from "react-icons/io";
import { CustomTheme } from "../Theme";
import { useDispatch } from "react-redux";
import { DeleteUser } from "../ReduxSlices/User";
export default function DeleteUserDialog() {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const { fonts } = CustomTheme;
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        sx={{
          backgroundColor: "#f1513a",
          color: "white",
          ":hover": {
            backgroundColor: "#f1513a",
          },
          fontFamily: fonts.hom,
          textTransform: "none",
          fontWeight: 500,
        }}
        startIcon={<IoMdClose />}
        size="small"
        onClick={handleClickOpen}
      >
        Delete Account
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"You are about to delete your account?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            That will delete your account and all of your messages permanently
            and cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>discard</Button>
          <Button onClick={() => dispatch(DeleteUser())}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
