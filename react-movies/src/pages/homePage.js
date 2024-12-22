import {React,useState} from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import Pagenation from '../components/pagination'
import PlayListAddIcon from "../components/cardIcons/playlistAdd";
const HomePage = (props) => {

  const [page, setPage] = useState(1);
 // const {  data, error, isLoading, isError }  = useQuery('discover', getMovies)
  const { data, error, isLoading, isError } = useQuery(['discover', page], () => getMovies(page), {
    keepPreviousData: true, // Helps in smoother transitions between pages
  });
  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;


  // Pagination Handlers
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <PageTemplate
        title="Discover Movies"
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

        <Pagenation
        currentPage={page}
        totalPages={500} // Example: Total pages from API
        onPageChange={handlePageChange}
        />
      

    </>
);
};
export default HomePage;