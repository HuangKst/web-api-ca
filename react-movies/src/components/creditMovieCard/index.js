import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";



const creditMovieCard = ({movie})=>{

    if (!movie) return null; // 如果没有电影数据，不渲染

  return (
    <Link to={`/movies/${movie.id}`} style={{ textDecoration: "none" }}>
    <Box sx={{ width: 150, textAlign: "center" }}>
      {/* 图片展示 */}
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
        style={{
          borderRadius: "8px",
          width: "100%",
          height: "auto",
        }}
      />
      {/* 电影标题 */}
      <Typography
        variant="body2"
        sx={{
          marginTop: 1,
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {movie.title}
      </Typography>
    </Box>
    </Link>
    
  );

}

export default creditMovieCard;