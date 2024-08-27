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
  const isSmallScreen = useMediaQuery("(max-width:960px)");
  const [opacity, setOpacity] = useState(1);
  const audioRef = useRef(null);
  const [audioMuted, setAudioMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [src, setSrc] = useState(
    `https://cms.samespace.com/assets/${imageUrl}`
  );

  useEffect(() => {
    setOpacity(0);
    const timeout = setTimeout(() => {
      setSrc(`https://cms.samespace.com/assets/${imageUrl}`);
      setOpacity(1);
    }, 500);
    return () => clearTimeout(timeout);
  }, [imageUrl]);

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
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        transition: "background-color 1s ease",
        alignItems: isSmallScreen ? "center" : "flex-start",
        height: isSmallScreen ? "auto" : "100vh",
        backgroundColor,
        margin: isSmallScreen ? "100%" : "none",
        maxWidth: isSmallScreen ? "100%" : "none",
      }}
    >
      <CardContent>
        <Typography variant="h4" component="div" sx={{ mb: 1, color: "white" }}>
          {track?.name}
        </Typography>
        <Typography
          variant="subtitle1"
          component="div"
          sx={{ marginLeft: "5px", fontSize: "0.8rem", color: "gray" }}
        >
          {track?.artist}
        </Typography>
      </CardContent>
      <Box
        sx={{
          padding: "-15px",
          width: isSmallScreen ? "80%" : "450px",
          height: isSmallScreen ? "auto" : "450px",
          margin: "20px",
          borderRadius: "10px",
          overflow: "hidden",
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
          }}
          src={src}
          alt="song cover"
        />
      </Box>
      <Slider
        value={currentTime}
        max={duration}
        onChange={handleSliderChange}
        aria-labelledby="Continous-Slider"
        sx={{ width: "80%", mt: 4, marginLeft: "20px" }}
      />
      {/* music control section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          width: "100%",
          marginBottom: "45px",
        }}
      >
        <Box item flex="1">
          <IconButton
            sx={{ ml: 2, display: "inline-block", transform: "rotate(90deg)" }}
          >
            <MoreVertIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Box item flex="2">
          <IconButton onClick={handlePrevious} sx={{ mr: 2 }}>
            <SkipPreviousIcon sx={{ color: "white" }} />
          </IconButton>
          <IconButton onClick={handlePlayPause}>
            {isPlaying ? (
              <PauseIcon sx={{ color: "white" }} />
            ) : (
              <PlayArrowIcon sx={{ color: "white" }} />
            )}
          </IconButton>
          <IconButton onClick={handleNext} sx={{ ml: 2 }}>
            <SkipNextIcon sx={{ color: "white" }} />
          </IconButton>
        </Box>
        <Box item flex="1">
          <IconButton onClick={toggleMute} sx={{ ml: 2 }}>
            {audioMuted ? (
              <VolumeOffIcon sx={{ color: "white" }} />
            ) : (
              <VolumeUpIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </Box>
      </Box>
      <audio ref={audioRef} />
    </Card>
  );
};

export default MusicPlayer;
