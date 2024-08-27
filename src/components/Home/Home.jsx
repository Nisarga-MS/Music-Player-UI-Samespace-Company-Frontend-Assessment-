import React, { useEffect, useState } from "react";
import { MUSIC_API } from "../MusicUtils/MusicUtils";
import { musicDurationHandler } from "../MusicUtils/MusicUtils";
import SideMenu from "../SideMenu/SideMenu";
import MusicList from "../MusicList/MusicList";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import MenuIcon from "@mui/icons-material/Menu";
import { Grid, IconButton, Drawer, Box, useMediaQuery } from "@mui/material";

const Home = () => {
  const isSmallScreen = useMediaQuery("max-width:960px");
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
        backgroundColor: color,
        transition: "background-color 1s ease",
        margin: 0,
      }}
    >
      {!isSmallScreen && (
        <Grid item md={3} marginTop={"-20px"}>
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
      {isSmallScreen && (
        <>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ position: "fixed", top: 10, left: 10, zIndex: 1200 }}
          >
            <MenuIcon sx={{ color: "white" }} />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={() => setDrawerOpen(false)}
          >
            <Box
              sx={{
                width: 250,
                backgroundColor: color,
                transition: "background-color 1s ease",
                height: "100%",
                padding: "3px",
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
