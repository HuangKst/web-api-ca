import React, { useState } from "react";
import { getTopRateMovies } from "../api/movies-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import PlayListAddIcon from "../components/cardIcons/playlistAdd";
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import PaginationComponent from "../components/pagination";
const TopRatePage = () => {

  const [page, setpage] = useState(1);

    const {  data, error, isLoading, isError }  = useQuery(['TopRatedMovies', page],()=>getTopRateMovies(page),{keepPreviousData:true})

    if (isLoading) {
      return <Spinner />
    }
  
    if (isError) {
      return <h1>{error.message}</h1>
    }

    const movies = data.results;
    const favorites = movies.filter(m => m.favorite);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    const handlePageChange = (event,value)=>{
      setpage(value)
    }
  


  return (
    <>
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie)=>{
        return(
          <div>
                <PlayListAddIcon movie={movie}/>
                <AddToFavoritesIcon movie={movie}/>
          </div>
        )
                

      }} 
    />
    <PaginationComponent
    currentPage={page}
    totalPages={500} 
    onPageChange={handlePageChange}
    />

  </>
);
};
export default TopRatePage;