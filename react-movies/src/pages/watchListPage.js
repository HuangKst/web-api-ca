import React, { useContext } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/movies-api";
import Spinner from "../components/spinner";
import RemoveFromWatchListIcon from "../components/cardIcons/removeFromWatchList";
import WriteReviewIcon from "../components/cardIcons/writeReview";

const WatchListPage = () => {
  const { playList: movieIds } = useContext(MoviesContext);

  // Create an array of queries and run them in parallel.
  const watchListQueries = useQueries(
    movieIds.map((movieId) => {
      return {
        queryKey: ["movie", { id: movieId }],
        queryFn: getMovie,
      };
    })
  );

  // Check if any of the parallel queries is still loading.
  const isLoading = watchListQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  // Transform the fetched data to match the expected format for PageTemplate
  const movies = watchListQueries
    .filter((q) => q.data) // Only process queries that have valid data
    .map((q) => {
      q.data.genre_ids = q.data.genres.map((g) => g.id); // Map genres to genre_ids
      return q.data;
    });


  return (
    <PageTemplate
      title="Watch List Movies"
      movies={movies}
      action={(movie) => {
        return (
          <>
            <RemoveFromWatchListIcon movie={movie} />
            <WriteReviewIcon movie={movie} />
          </>
        );
      }}
    />
  );
};

export default WatchListPage;
