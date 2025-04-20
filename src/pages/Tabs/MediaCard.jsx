import ShareIcon from "@mui/icons-material/Share";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Typography
} from "@mui/material";
import { styled } from "@mui/material/styles";
import * as React from "react";
import iplVideo from "../../assets/iplVideo.jpg";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: (props) => (props.expand ? "rotate(180deg)" : "rotate(0deg)"),
}));
export default function MediaCard({
  heading,
  date,
  views,
  duration,
  bgColor,
  textColor,
}) {
  return (
    <Card
      sx={{
        maxWidth: 250,
        maxHeight: 300,
        height: 300,
        borderRadius: 4,
        boxShadow: 1,
        display: "flex",
        flexDirection: "column",
        bgcolor: bgColor || "white",
        color: textColor || "black",
      }}
    >
      <CardMedia
        component="img"
        height="80"
        image={iplVideo}
        alt="Video Thumbnail"
        sx={{ flexShrink: 0, borderRadius: 4, boxShadow: 3 }}
      />
      <CardContent
        sx={{
          px: 1,
          py: 1,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          color: textColor || "black",

          overflow: "hidden",
        }}
      >
        
        <Box display="flex" alignItems="start" justifyContent="start" gap={2}>
          <Typography
            variant="h6"
            fontWeight={550}
            sx={{ maxWidth: "90%", color: textColor || "black" }}
          >
            {heading}
          </Typography>
          <IconButton aria-label="share" sx={{ color: textColor || "black" }}>
            <ShareIcon />
          </IconButton>
        </Box>

        
        <Divider sx={{ my: 1, backgroundColor: "#e0e0e0" }} />

      
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{  mb: 1, color: textColor || "black" }}
        >
          <Typography variant="caption">{date} </Typography>
          {views && (
            <Stack direction="row" spacing={1} alignItems="center">
              <VisibilityIcon fontSize="small" />
              <Typography variant="caption">{views}</Typography>
            </Stack>
          )}
          {duration && <Typography variant="caption">{duration}</Typography>}
        </Stack>
      </CardContent>
    </Card>
  );
}
