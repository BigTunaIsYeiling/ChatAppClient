import { Box, Stack } from "@mui/material";
import img from "../logo.png";
import { CustomTheme } from "../Theme";
export const NoConversations = () => {
  const { fonts } = CustomTheme;
  return (
    <Stack
      alignItems={"center"}
      justifyContent={{ xs: "flex-start", md: "center" }}
      direction={"column"}
      spacing={2}
      height={"100%"}
      paddingTop={{ xs: "4rem", md: "0" }}
      overflow={"auto"}
    >
      <Box component={"img"} src={img} width={"150px"} sx={{
        opacity: 0.4,
      }} />
      <Stack direction={"column"} spacing={0.2} alignItems={"center"}>
        <Box sx={{ fontFamily: fonts.header, textAlign: "center" }}>
          There's no any conversation here yet
        </Box>
        <Box
          sx={{ fontFamily: fonts.header, opacity: 0.6 }}
          fontSize={"14px"}
          textAlign={"center"}
        >
          Click on Users to start conversations with them .
        </Box>
      </Stack>
    </Stack>
  );
};
