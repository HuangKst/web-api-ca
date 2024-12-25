// movieDetailsPage.js
import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import MovieDetails from '../components/movieDetails/';
import PageTemplate from '../components/templateMoviePage';
import Spinner from '../components/spinner';
import CreditsList from '../components/creditsList';
import { getMovie } from '../api/movies-api';
import { getMovieCredits } from '../api/tmdb-api';

const MoviePage = () => {
  const { id } = useParams();
  const { data: movie, error: movieError, isLoading: isMovieLoading } = useQuery(
    ["movie", { id: id }],
    getMovie
  );
  const { data: creditsData, error: creditsError, isLoading: isCreditsLoading } = useQuery(
    ["credits", { id: id }],
    getMovieCredits
  );

  if (isMovieLoading || isCreditsLoading) return <Spinner />;
  if (movieError) return <h1>{movieError.message}</h1>;
  if (creditsError) return <h1>{creditsError.message}</h1>;

  return (
    <>
      {movie && creditsData ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            <CreditsList credits={creditsData.cast.slice(0,6)} movie={movie}/>
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;
