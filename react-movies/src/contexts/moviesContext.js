import React, { useState,useEffect, useContext } from "react";
import { getFavouriteMovies,addFavouriteMovie,deleteFavouriteMovie } from "../api/favourite-api";
import { AuthContext } from "./authContext"; 
export const MoviesContext = React.createContext(null);


const MoviesContextProvider = (props) => {
  const { userId, isAuthenticated } = useContext(AuthContext); 
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [playList, setPlayList] = useState([])

  
  

  useEffect(() => {
    const fetchFavourites = async () => {
      
      if (!isAuthenticated || !userId) return;

      const data = await getFavouriteMovies(userId);
      if (Array.isArray(data)) {
        const movieIds = data.map((f) => f.movieId);
        setFavorites(movieIds);
      } else {
        console.warn(data.msg || "Failed to fetch favourites");
      }
    };

    fetchFavourites();
  }, [isAuthenticated, userId]); 
  
  

  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };
  //console.log(myReviews);

  const addToFavorites = async (movie) => {
    // 调后端
    const result = await addFavouriteMovie(userId, movie.id);
    if (result.success) {
      // 更新本地state
      setFavorites([...favorites, movie.id]);
    } else {
      alert(result.msg || "Add to favourites failed.");
    }
  };

  
  const addMovieToPlayList = (movie) => {
    let newPlayList = [];
    if (!playList.includes(movie.id)) {
      newPlayList = [...playList, movie.id];
    }
    else {
      newPlayList = [...playList];
    }
    setPlayList(newPlayList)
  };

  
  // We will use this function in the next step
  const removeFromFavorites = async (movie) => {
   
    // 调后端
    const result = await deleteFavouriteMovie(userId, movie.id);
    if (result.success) {
      // 更新本地state
      setFavorites(favorites.filter((mId) => mId !== movie.id));
    } else {
      alert(result.msg || "Remove from favourites failed.");
    }
  };

  const removeFromWatchList=(movie)=>{
    setPlayList(
      playList.filter(
        (mId) => mId !== movie.id
      )
    )

  }



  
  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addMovieToPlayList,
        playList,
        removeFromWatchList,
        userId
       
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;