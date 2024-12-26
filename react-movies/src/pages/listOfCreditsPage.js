import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import {getMovie} from"../api/movies-api"
import { getMovieCredits } from "../api/movies-api";
import MovieHeader from "../components/headerMovie";
import Spinner from "../components/spinner";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CreditItem from "../components/credits";

const ListOfCreditsPage = () => {
  const { id } = useParams();
  const { data: movie, error: movieError, isLoading: isMovieLoading } = useQuery(
    ["movie", { id: id }],
    getMovie
  );
  const { data: creditsData, error: creditsError, isLoading: isCreditsLoading } = useQuery(
    ["credits", { id: id }],
    getMovieCredits
  );

  const credits = creditsData ? creditsData.cast : [];

  if (isMovieLoading || isCreditsLoading) return <Spinner />;
  if (movieError || creditsError)
    return <h1>{movieError?.message || creditsError?.message}</h1>;

  return (
    <>
      <MovieHeader movie={movie} />
      <div style={{ padding: "15px" }}>
        <Typography variant="h4" gutterBottom>
          Full Cast & Crew
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {credits.map((cast, index) => (
            cast && (
              <Grid item xs={12} sm={6} md={4} lg={3} key={cast.id || index}>
                <CreditItem cast={cast} movie={movie} />
              </Grid>
            )
          ))}
        </Grid>
      </div>
    </>
  );
};

export default ListOfCreditsPage;
