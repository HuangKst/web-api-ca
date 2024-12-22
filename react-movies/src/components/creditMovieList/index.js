import React from "react";
import CreditMovieCard from "../creditMovieCard";
import { Box ,ImageList,ImageListItem,Typography} from "@mui/material";


const CreditMovieList =({movies})=>{

    if (!movies) return null;
    console.log(movies)

    return(
        <Box sx={{marginTop:4}}>
            <Typography variant="h4" gutterBottom >
            Known For
            </Typography>
            <ImageList
            sx={{display: "flex",
                flexWrap: "nowrap",
                overflowX: "scroll",
                gap: 10,
                padding: "10px 0",}}
                cols={movies.length}
                rowHeight={250}
            >
                {movies.map((movie)=>(
                    <ImageListItem key={movie.id} sx={{flex:"0 0 auto "}}>
                        <CreditMovieCard movie={movie}/>
                    </ImageListItem>
                ))}
            </ImageList>
        </Box>
    );




}

export default CreditMovieList;