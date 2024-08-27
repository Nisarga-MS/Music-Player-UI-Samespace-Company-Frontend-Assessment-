import React, { useEffect, useState } from "react";
import { MUSIC_API } from "../MusicUtils/MusicUtils";
import { musicDurationHandler } from "../MusicUtils/MusicUtils";
import Profile from "../../assets/Profile.png";
import SideMenu from "../SideMenu/SideMenu";
import MusicList from "../MusicList/MusicList";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Grid,
  IconButton,
  Drawer,
  Box,
  useMediaQuery,
  Avatar,
} from "@mui/material";

const Home = () => {
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  //states
  const [music, setMusic] = useState(1);
  const [color, setColor] = useState("#331A05");
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [topData, setTopData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const filterTopTracks = (filterdata) => {
    return filterdata?.filter((track) => track?.top_track);
  };

  const handleImage = (music) => {
    const temp = data?.find((item) => item.id === music);
    if (temp) {
      console.log(temp.id, music, temp.cover);
      return temp.cover;
    }
  };

  const handleColor = (music) => {
    const temp = data?.find((item) => item.id === music);
    if (temp) {
      console.log(temp.id, music, temp.accent);
      setColor(temp.accent);
    }
  };

  const handleMusicUrl = (music) => {
    const temp = data?.find((item) => item.id === music);
    if (temp) {
      console.log(temp.id, music, temp.url);
      return temp.url;
    }
  };

  const handleTrack = (music) => {
    const temp = data?.find((item) => item.id === music);
    if (temp) {
      return temp;
    }
  };

  async function getData() {
    try {
      const response = await fetch(MUSIC_API);
      const res = await response.json();
      const { data } = res;
      const tempData = await musicDurationHandler(data);
      console.log("tempData", tempData);
      setData(tempData);
      setAllData(tempData);
      setTopData(filterTopTracks(tempData));
    } catch (error) {
      console.error("Failed To Load Data:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Grid
      container
      justifyContent="space-between"
      spacing={2}
      sx={{
        margin: 0,
        backgroundColor: color,
        transition: "background-color 1s ease",
        fontFamily: "Inter",
      }}
    >
      {/* app logo & profile pick left most part (sidemenu at lagre screen) */}
      {!isSmallScreen && (
        <Grid item md={3} marginTop="-20px">
          <SideMenu />
        </Grid>
      )}

      {!isSmallScreen && (
        <Grid
          item
          md={4}
          sx={{
            backgroundColor: color,
            transition: "background-color 1s ease",
            fontFamily: "Inter",
          }}
        >
          {/* list of music displayed */}
          <MusicList
            data={data}
            setMusic={setMusic}
            color={color}
            setColor={setColor}
            allData={allData}
            setAllData={setAllData}
            topData={topData}
            setTopData={setTopData}
          />
        </Grid>
      )}
      <Grid item marginTop="10px" md={isSmallScreen ? 12 : 5}>
        <MusicPlayer
          imageUrl={handleImage(music)}
          musicUrl={handleMusicUrl(music)}
          music={music}
          setMusic={setMusic}
          track={handleTrack(music)}
          handleColor={handleColor}
          backgroundColor={color}
        />
      </Grid>
      {/* display at small screen device */}
      {isSmallScreen && (
        <>
          <Grid>
            <IconButton
              onClick={() => setDrawerOpen(true)}
              sx={{
                position: "fixed",
                top: 10,
                left: 10,
                zIndex: 1200,
                fontFamily: "Inter",
              }}
            >
              <MenuIcon sx={{ color: "white" }} />
            </IconButton>
            <Avatar
              src={Profile}
              alt="Profile Pick"
              sx={{
                width: "38px",
                height: "38px",
                position: "fixed",
                top: 13,
                right: 28,
                zIndex: 1200,
                fontFamily: "Inter",
              }}
            />
          </Grid>
          {/* for smallscreen device drawer sidebar */}
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box
              sx={{
                width: 250,
                height: "120%",
                padding: "3px",
                backgroundColor: color,
                transition: "background-color 1s ease",
                fontFamily: "Inter",
              }}
            >
              <MusicList
                data={data}
                setMusic={setMusic}
                color={color}
                setColor={setColor}
                allData={allData}
                setAllData={setAllData}
                topData={topData}
                setTopData={setTopData}
              />
            </Box>
          </Drawer>
        </>
      )}
    </Grid>
  );
};

export default Home;
