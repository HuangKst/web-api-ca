import { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import PlaylistAdd from "@mui/icons-material/PlaylistAdd";
import IconButton from "@mui/material/IconButton";

const PlayListAddIcon =({movie})=>{
    const context = useContext(MoviesContext);

    const handlePlayListAdd = (e) =>{
        context.addMovieToPlayList(movie);
        console.log("PlayList: " + context.playList)
    };
    return(
        <IconButton aria-label="play list add " onClick={handlePlayListAdd}>
            <PlaylistAdd color="primary" fontSize="large"/>
        </IconButton>
    )
}

export default PlayListAddIcon;