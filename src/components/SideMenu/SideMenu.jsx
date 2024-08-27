import React from "react";
import { Box, Avatar } from "@mui/material";
import Logo from "../../assets/Logo.png";
import Profile from "../../assets/Profile.png";

const SideMenu = () => {
  return (
    <Box
      container
      sx={{
        margin: "4",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {/* App logo display at Left Corner */}
      <Box item sx={{ marginBottom: "10px" }}>
        <Avatar
          src={Logo}
          alt="App Logo"
          style={{
            width: "134px",
            height: "40px",
            marginRight: "10px",
            marginLeft: "10px",
          }}
        />
      </Box>
      {/* Profile pick display at bottom left */}
      <Box item sx={{ marginBottom: "50px" }}>
        <Avatar
          src={Profile}
          alt="profile pick"
          style={{
            width: "48px",
            height: "48px",
            marginRight: "10px",
            marginLeft: "32px",
          }}
        />
      </Box>
    </Box>
  );
};

export default SideMenu;
