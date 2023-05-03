import { useState } from "react";
import { CustomTheme } from "../Theme";
import { Box, Button, IconButton, Stack } from "@mui/material";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import "../style.scss";
import img from "../logo.png";
import { NavLink } from "react-router-dom";
import { SetRegister } from "../ReduxSlices/User";
import { useDispatch } from "react-redux";
export const SignUp = () => {
  const { fonts } = CustomTheme;
  const [showpass, setpassinp] = useState(false);
  const [LoginData, SetLoginData] = useState({
    email: "",
    password: "",
    username: "",
  });
  const dispatch = useDispatch();
  const onchange = (e) => {
    const { value, name } = e.target;
    SetLoginData((prev) => {
      return { ...prev, [name]: value };
    });
  };
  return (
    <Box height={{ xs: "100%", md: "100vh" }}>
      <Stack
        justifyContent={{ xs: "flex-start", md: "center" }}
        alignItems="center"
        paddingTop={{ xs: 2, md: 1 }}
        height={"100%"}
      >
        <Stack
          padding={{ xs: "0rem 3rem 0rem 3rem", sm: "1rem 3rem 2rem 3rem" }}
          direction={"column"}
          bgcolor={{ xs: "transparent", md: "#313338" }}
          width={{ xs: "82%", sm: "50%", md: "30%" }}
          position="relative"
          borderRadius={"2%"}
        >
          <Stack
            alignSelf={"center"}
            direction={"row"}
            alignItems="center"
            marginTop={1}
            marginBottom={3}
          >
            <img src={img} alt="logo" height="40px" />
          </Stack>
          <Box
            alignSelf={"center "}
            fontFamily={fonts.arabic}
            fontSize="23px"
            fontWeight={500}
          >
            Create Account
          </Box>
          <Box
            alignSelf={"center "}
            fontFamily={fonts.arabic}
            fontSize="17px"
            fontWeight={400}
            color="#777"
          >
            Get an access to BT
          </Box>
          <Stack direction={"column"} spacing="20px" marginTop={"2rem"}>
            <Stack
              direction={"column"}
              spacing="10px"
              alignItems={"flex-start"}
            >
              <Box
                fontFamily={fonts.hom}
                fontSize="12px"
                fontWeight={600}
                color={"#b2b7be"}
              >
                EMAIL
              </Box>
              <Box
                component={"input"}
                paddingY={"10px"}
                paddingX="8px"
                sx={{
                  outline: "0",
                  border: "0",
                  backgroundColor: "#1e1f22",
                  borderRadius: "3px",
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  width: "100%",
                  color: "white",
                }}
                placeholder="e.g.mah@gmail.com"
                name="email"
                value={LoginData.email}
                onChange={onchange}
              />
            </Stack>
            <Stack
              direction={"column"}
              spacing="10px"
              alignItems={"flex-start"}
            >
              <Box
                fontFamily={fonts.hom}
                fontSize="12px"
                fontWeight={600}
                color={"#b2b7be"}
              >
                USERNAME
              </Box>
              <Box
                component={"input"}
                paddingY={"10px"}
                paddingX="8px"
                sx={{
                  outline: "0",
                  border: "0",
                  backgroundColor: "#1e1f22",
                  borderRadius: "3px",
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  width: "100%",
                  color: "white",
                }}
                placeholder="ABCDEFG#$"
                name="username"
                value={LoginData.username}
                onChange={onchange}
              />
            </Stack>
            <Stack
              direction={"column"}
              spacing="10px"
              position={"relative"}
              alignItems={"flex-start"}
            >
              <Box
                component={IconButton}
                sx={{ position: "absolute", right: 5, bottom: "5%" }}
                size="small"
                onClick={() => setpassinp((prev) => !prev)}
              >
                {!showpass ? (
                  <Box component={VscEye} color="white" />
                ) : (
                  <Box component={VscEyeClosed} color="white" />
                )}
              </Box>
              <Box
                fontFamily={fonts.hom}
                fontSize="12px"
                fontWeight={600}
                color={"#b2b7be"}
              >
                PASSWORD
              </Box>
              <Box
                component={"input"}
                paddingY={"10px"}
                type={showpass ? "text" : "password"}
                paddingX="8px"
                sx={{
                  outline: "0",
                  border: "0",
                  backgroundColor: "#1e1f22",
                  borderRadius: "3px",
                  fontFamily: fonts.body,
                  fontWeight: 400,
                  width: "100%",
                  color: "white",
                }}
                placeholder="e.g.******"
                name="password"
                value={LoginData.password}
                onChange={onchange}
              />
            </Stack>
          </Stack>
          <Box
            component={Button}
            fontFamily={fonts.arabic}
            fontWeight="600"
            sx={{
              textTransform: "none",
              color: "white",
              backgroundColor: "#5865f2",
              ":hover": {
                backgroundColor: "#5865f2",
              },
            }}
            marginTop="3rem"
            onClick={() => {
              dispatch(SetRegister(LoginData));
            }}
          >
            Register
          </Box>
          <Box position={"relative"} marginTop={"2rem"}>
            <Box
              fontFamily={fonts.arabic}
              fontSize="14px"
              fontWeight={600}
              lineHeight="1.5rem"
              color="#777"
              textAlign={"center"}
            >
              Already have an account?
              <Box component={NavLink} color={"#00a8fc"} to={"login"}>
                {" "}
                Login
              </Box>
            </Box>
          </Box>
        </Stack>
      </Stack>
    </Box>
  );
};
