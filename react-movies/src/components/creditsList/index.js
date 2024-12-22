import React from "react";
import Slider from "react-slick";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CreditItem from "../credits";
import Button from "@mui/material/Button";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";


const CreditsList = ({ credits ,movie}) => {
  const navigate = useNavigate();
  if (!credits || credits.length === 0) {
    return (
      <Typography variant="body2">No cast information available.</Typography>
    );
  }

  

  // React Slick settings
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5, // 控制每页显示多少演员
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <Box sx={{ padding: "15px" }}>
      <Typography variant="h5" gutterBottom>
        Credits
      </Typography>
      <Slider {...settings}>
        {credits.map((cast, index) => (
          cast ? (
            <Box key={cast.id || index} sx={{ padding: "10px" }}>
              <CreditItem cast={cast} />
            </Box>
          ) : null
        ))}
        {/* 最后一个滑块：展示“更多演员” */}
        <Box 
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height:"200px",
            padding: "10px",
          }}
        >
          <Button 
          variant="contained" 
          color="primary"  
          onClick={() => navigate(`/movies/${movie.id}/cast`)}
          >
            View More
          </Button>
        </Box>
      </Slider>
    </Box>
  );
};

export default CreditsList;
