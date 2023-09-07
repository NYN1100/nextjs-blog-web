import { Telegram, Instagram, Facebook } from "@mui/icons-material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import format from "date-fns/format";
const Footer = () => {
  return (
    <Box
      padding={"20px"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#141414",
        color: "white",
      }}
    >
      <Typography>
        &copy; {format(new Date(), "yyyy")} All rights reserved
      </Typography>
      <Box sx={{ display: "flex", gap: "5px" }}>
        <Telegram></Telegram>
        <Instagram></Instagram>
        <Facebook></Facebook>
      </Box>
    </Box>
  );
};

export default Footer;
