import React, { useEffect, useRef, useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";

const MusicPlayer = ({
  imageUrl,
  musicUrl,
  music,
  setMusic,
  track,
  handleColor,
  backgroundColor,
}) => {
  const isSmallScreen = useMediaQuery("(max-width: 960px)");
  // states
  const [opacity, setOpacity] = useState(1);
  const audioRef = useRef(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const img = `https://cms.samespace.com/assets/${imageUrl}`;
  const [src, setSrc] = useState(img);

  // setting image & its opacity at player
  useEffect(() => {
    setOpacity(0);
    const timeout = setTimeout(() => {
      setSrc(img);
      setOpacity(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [imageUrl]);

  //audio data and timeupdate
  useEffect(() => {
    const audio = audioRef.current;
    audio.src = musicUrl;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Failed to start audio playback:", error);
      });

    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);

    return () => {
      audio.removeEventListener("loadedata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
    };
  }, [musicUrl]);

  // functions to handle music(play,pause,next,prev,toggle audio)

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSliderChange = (event, newValue) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime = newValue;
      setCurrentTime(newValue);
    }
  };

  const handleNext = () => {
    const nextMusic = music === 4 ? 7 : music === 10 ? 1 : music + 1;
    setMusic(nextMusic);
    handleColor(music + 1);
    setIsPlaying(true);
  };
  const handlePrevious = () => {
    const previousMusic = music === 7 ? 4 : music === 1 ? 10 : music - 1;
    setMusic(previousMusic);
    handleColor(music - 1);
    setIsPlaying(true);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = !audio.muted;
      setAudioMuted(audio.muted);
    }
  };
  return (
    // music player card
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: isSmallScreen ? "center" : "flex-start",
        maxWidth: isSmallScreen ? "100%" : "80%",
        height: isSmallScreen ? "100vh" : "98vh",
        margin: isSmallScreen ? "auto" : "0",
        marginTop: "-12px",
        marginLeft: isSmallScreen ? "-7px" : "0",
        transition: "background-color 1s ease",
        backgroundColor,
        fontFamily: "Inter",
      }}
    >
      {/* top section of music play (name&artist) */}
      <CardContent>
        <Typography
          variant="h4"
          component="div"
          sx={{ mb: 1, color: "white", fontFamily: "Inter" }}
        >
          {track?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{
            color: "gray",
            marginLeft: "5px",
            fontSize: "0.8rem",
            fontFamily: "Inter",
          }}
        >
          {track?.artist}
        </Typography>
      </CardContent>

      {/* middle section i.e song cover image */}
      <Box
        sx={{
          width: isSmallScreen ? "80%" : "400px",
          height: isSmallScreen ? "auto" : "440px",
          padding: "-15px",
          margin: "20px",
          borderRadius: "10px",
          overflow: "hidden",
          fontFamily: "Inter",
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 1s ease",
            opacity: opacity,
            fontFamily: "Inter",
          }}
          src={src}
          alt="song cover"
        />
      </Box>

      {/* music controls play,pause,next,prev,togglesound */}

      {/* time slider */}
      <Slider
        value={currentTime}
        max={duration}
        onChange={handleSliderChange}
        aria-labelledby="Continous-Slider"
        sx={{ width: "80%", mt: 4, marginLeft: "20px", fontFamily: "Inter" }}
      />

      {/* music control section all buttons*/}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: "45px",
          alignItems: "center",
          px: 2,
          fontFamily: "Inter",
        }}
      >
        <Box item flex="1">
          <IconButton
            sx={{
              ml: 2,
              display: "inline-block",
              transform: "rotate(90deg)",
              fontFamily: "Inter",
            }}
          >
            <MoreVertIcon sx={{ color: "white", fontFamily: "Inter" }} />
          </IconButton>
        </Box>
        <Box item flex="2">
          <IconButton
            onClick={handlePrevious}
            sx={{ mr: 2, fontFamily: "Inter" }}
          >
            <SkipPreviousIcon sx={{ color: "white", fontFamily: "Inter" }} />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? (
              <PauseIcon sx={{ color: "white", fontFamily: "Inter" }} />
            ) : (
              <PlayArrowIcon sx={{ color: "white", fontFamily: "Inter" }} />
            )}
          </IconButton>
          <IconButton onClick={handleNext} sx={{ ml: 2, fontFamily: "Inter" }}>
            <SkipNextIcon sx={{ color: "white", fontFamily: "Inter" }} />
          </IconButton>
        </Box>
        <Box item flex="1">
          <IconButton onClick={toggleMute} sx={{ ml: 2, fontFamily: "Inter" }}>
            {audioMuted ? (
              <VolumeOffIcon sx={{ color: "white", fontFamily: "Inter" }} />
            ) : (
              <VolumeUpIcon sx={{ color: "white", fontFamily: "Inter" }} />
            )}
          </IconButton>
        </Box>
      </Box>
      <audio ref={audioRef} />
    </Card>
  );
};

export default MusicPlayer;
