import {
  AppBar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
} from "@mui/material";
// import { FiMenu } from "react-icons/fi";
import { RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineSetting } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { useEffect, useRef, useState } from "react";
import { CustomTheme } from "../Theme";
import img from "../logo.png";
import useWindowSize from "../UseWindowHook";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SetLogout } from "../ReduxSlices/User";
export const Header = ({ setHeaderHeight }) => {
  const { fonts } = CustomTheme;
  const headRef = useRef();
  const { width } = useWindowSize();
  const navigate = useNavigate();
  const setHeight = () => {
    setHeaderHeight(headRef.current.clientHeight);
  };
  useEffect(() => {
    setHeight();
    // eslint-disable-next-line
  }, [width]);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  return (
    <Box sx={{ flexGrow: 1, position: "relative" }} ref={headRef} zIndex={1000}>
      <AppBar
        position="relative"
        sx={{
          "&.MuiPaper-root": {
            backgroundColor: "#1e1f22",
            boxShadow: "none",
          },
        }}
      >
        <Toolbar>
          <img src={img} alt="logo" height="40px" />
          <Box
            component="p"
            sx={{ flexGrow: 1 }}
            fontFamily={fonts.body}
            fontSize={"20px"}
            fontWeight={600}
          >
            BT
            <Box component={"span"} fontSize={"16px"}>
              ChattApp
            </Box>
          </Box>
          <IconButton
            size="large"
            id="demo-positioned-button"
            aria-controls={open ? "demo-positioned-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <RiUserSettingsLine color="white" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem
              onClick={() => {
                navigate("settings");
              }}
            >
              <ListItemIcon>
                <AiOutlineSetting />
              </ListItemIcon>
              Settings
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={() => {
                dispatch(SetLogout());
              }}
            >
              <ListItemIcon>
                <BiLogOut />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
