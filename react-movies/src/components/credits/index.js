import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const CreditItem = ({ cast }) => {
  return (
    <Card
      sx={{
        width: "70%", // 卡片宽度由父容器控制
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // 添加阴影
        borderRadius: "8px", // 圆角卡片
        overflow: "hidden", // 防止图片超出边界
      }}
    >
      <Link to={`/credits/${cast.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="img"
          image={
            cast.profile_path
              ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
              : "https://via.placeholder.com/150"
          }
          alt={cast.name}
          sx={{
            width: "100%", // 图片宽度填满卡片
            aspectRatio: "3/4", // 保持 3:4 比例
            objectFit: "cover", // 保持比例裁剪
          }}
        />
      </Link>
      <CardContent>
        <Typography variant="h6" component="div" fontWeight="bold">
          {cast.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {cast.character}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CreditItem;
