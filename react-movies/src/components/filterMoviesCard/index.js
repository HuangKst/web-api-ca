import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../images/pexels-dziana-hasanbekava-5480827.jpg'
import React, {useState, useEffect}  from "react";
import { getGenres } from "../../api/movies-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'

const formControl = 
  {
    margin: 1,
    minWidth: "90%",
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {

  const { data, error, isLoading, isError } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data;
  console.log(genres)
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };
  const handleDateChange = (e, type) => {
    handleChange(e, type, e.target.value);
  };
  const handleRateChange=(e,type)=>{
    handleChange(e,"rateOrder",e.target.value);
  }

  return (
    <Card 
      sx={{
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={{...formControl}}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={handleTextChange}
        />
        <FormControl sx={{...formControl}}>
          <InputLabel id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
          Filter by Release Date:
        </Typography>
        <TextField
          sx={{ ...formControl }}
          id="from-date"
          label="From"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => handleDateChange(e, "fromDate")}
        />
        <TextField
          sx={{ ...formControl }}
          id="to-date"
          label="To"
          type="date"
          InputLabelProps={{ shrink: true }}
          onChange={(e) => handleDateChange(e, "toDate")}
        />

        <Typography variant="h6" component="h2" sx={{ marginTop: 2 }}>
          Sort by Rating:
        </Typography>
        <FormControl sx={{ ...formControl }}>
          <InputLabel id="rate-label">Rate</InputLabel>
          <Select
            labelId="rate-label"
            id="rate-select"
            value={props.rateOrder}
            onChange={handleRateChange}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>
      </CardContent>
      <CardMedia
        sx={{ height: 200 }}
        image={img}
        title="Filter"
      />
      
    </Card>
  );
}