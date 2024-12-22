import React from 'react';
import CreditsSlider from '../components/creditsSidebar';
import { getCreditDetails } from '../api/tmdb-api';
import { useParams } from 'react-router-dom';
import Spinner from '../components/spinner';
import { useQuery } from "react-query";
import CreditDetail from '../components/creditDetail';
import { getCreditMovies } from "../api/tmdb-api";
import CreditMovieList from "../components/creditMovieList"


const CreditsPage = () => {
    const { id } = useParams();
    const { data: credits, error: creditsError, isLoading: isCreditsLoading } = useQuery(
      ["credits", { id: id }],
      getCreditDetails
    );
    const {data:movies,error:moviesError,isLoading:isMoviesLoading}=useQuery(
      ["movies",{id:id}],
      getCreditMovies
    )

    if (isCreditsLoading||isMoviesLoading) return <Spinner />;
    if (creditsError||moviesError) return <h1>{creditsError.message}</h1>;

    return (
        <>
          {credits ? (
            <>
              <CreditsSlider data={credits}>
                <CreditDetail credit={credits}/>
                <CreditMovieList movies={movies.cast}/>
              </CreditsSlider>
                
              
            </>
          ) : (
            <p>Waiting for movie details</p>
          )}
        </>
    );
};

export default CreditsPage;
