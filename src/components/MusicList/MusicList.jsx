import React, { useEffect, useState } from "react";
import { Grid, Typography, Input, Box, Avatar } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { lighten } from "polished";

const MusicList = ({
  data,
  setMusic,
  color,
  setColor,
  allData,
  setAllData,
  topData,
  setTopData,
}) => {
  //states
  const [stage, setStage] = useState(0);
  const [searchInput, setSearchInput] = useState("");

  const handleTrackClick = (track) => {
    setMusic(track.id);
    setColor(track.accent);
  };

  const handleChange = (event) => {
    setSearchInput(event.traget.value);
  };

  useEffect(() => {
    if (stage === 0) {
      //search functionality based on music name and artist
      const filtered = data?.filter(
        (track) =>
          track.name.toLowerCase()?.includes(searchInput.toLowerCase()) ||
          track.artist.toLowerCase()?.includes(searchInput.toLowerCase())
      );
      setAllData(filtered);
    } else {
      //search functionality of top tracks
      const filtered = data.filter(
        (track) =>
          track?.top_track &&
          (track.name.toLowerCase()?.includes(searchInput.toLowerCase()) ||
            track.artist.toLowerCase()?.includes(searchInput.toLowerCase()))
      );
      setTopData(filtered);
    }
  }, [searchInput]);

  return (
    <Grid>
      <Grid
        container
        justifyContent="flex-start"
        sx={{ marginBottom: 2, marginTop: 4, padding: "3px" }}
      >
        {/* Tab change between For You to Top Track */}
        {stage === 0 ? (
          <Typography
            sx={{ marginRight: 4, color: "white", cursor: "pointer" }}
            onClick={() => setStage(0)}
          >
            For You
          </Typography>
        ) : (
          <Typography
            sx={{ marginRight: 4, color: "gray", cursor: "pointer" }}
            onClick={() => setStage(0)}
          >
            For You
          </Typography>
        )}
        {stage === 1 ? (
          <Typography
            sx={{ color: "white", cursor: "pointer" }}
            onClick={() => setStage(1)}
          >
            Top Track
          </Typography>
        ) : (
          <Typography
            sx={{ color: "gray", cursor: "pointer" }}
            onClick={() => setStage(1)}
          >
            Top Tracks
          </Typography>
        )}
      </Grid>
      {/* search bar */}
      <Input
        sx={{
          width: "88%",
          background: lighten(0.2, color),
          padding: "4px",
          borderRadius: "7px",
          marginBottom: 2,
          transition: "background-color 1s ease",
          color: "white",
          "& .MuiInputBase-input": {
            color: "white",
          },
          "& .MuiInputAdornment-root": {
            color: "white",
          },
        }}
        placeholder="Search Song, Artist"
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        }
      />
      <Grid>
        {/* for you display */}
        {stage === 0
          ? allData.map((track) => (
              <Grid
                item
                key={track.id}
                alignItems="center"
                alignContent="center"
                xs={12}
                onClick={() => handleTrackClick(track)}
                sx={{
                  height: "70px",
                  cursor: "pointer",
                  "&:hover": {
                    borderRadius: "7px",
                    backgroundColor: lighten(0.2, color),
                    transition: "background-color 0.5s ease",
                    width: "100%",
                    overflow: "hidden",
                  },
                }}
              >
                <Grid container flex justifyContent="flex-start">
                  <Grid item>
                    <Box>
                      <Avatar
                        src={`https://cms.samespace.com/assets/${track.cover}`}
                        alt="cover pick"
                        style={{
                          width: "45px",
                          height: "45px",
                          marginLeft: "2px",
                          marginRight: "10px",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item sx={{ width: "70%" }}>
                    <Grid container flex justifyContent="space-between">
                      <Grid item flex justifyContent="flex-start">
                        <Typography sx={{ color: "white" }}>
                          {track.name}
                        </Typography>
                        <Typography sx={{ color: "gray" }}>
                          {track.artist}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ color: "gray", marginTop: "22px" }}>
                          {track.duraction}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))
          : // Top Track Display
            topData.map((track) => (
              <Grid
                item
                key={track.id}
                alignItems="center"
                alignContent="center"
                xs={12}
                onClick={() => handleTrackClick(track)}
                sx={{
                  height: "70px",
                  cursor: "pointer",
                  "&: hover": {
                    backgroundColor: lighten(0.2, color),
                    borderRadius: "7px",
                  },
                }}
              >
                <Grid container flex justifyContent="flex-start">
                  <Grid item>
                    <Box>
                      <Avatar
                        src={`https://cms.samespace.com/assets/${track.cover}`}
                        alt="cover pick"
                        style={{
                          width: "45px",
                          height: "45px",
                          marginRight: "10px",
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item sx={{ width: "70%" }}>
                    <Grid container flex justifyContent="space-between">
                      <Grid item flex justifyContent="flex-start">
                        <Typography sx={{ color: "white" }}>
                          {track.name}
                        </Typography>
                        <Typography sx={{ color: "gray" }}>
                          {track.artist}
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography sx={{ color: "gray" }}>
                          {track.duraction}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            ))}
      </Grid>
    </Grid>
  );
};

export default MusicList;
