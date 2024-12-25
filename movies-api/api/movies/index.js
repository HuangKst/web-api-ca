import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express, { json } from 'express';
import {
    getUpcomingMovies,getGenres,getMovies,getMovie,getMovieImages,getTopRateMovies
  } from '../tmdb-api';
  
const router = express.Router();

// GET /api/movies/upcoming?page=2
router.get('/upcoming', asyncHandler(async (req, res) => {
    let { page = 1 } = req.query;
    page = parseInt(page, 10);
  
    if (isNaN(page) || page < 1) {
      return res
        .status(400)
        .json({ message: 'Invalid page number. Must be a positive integer.' });
    }
  
    try {
      const data = await getUpcomingMovies(page);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error.message);
      res.status(500).json({ message: 'Failed to fetch upcoming movies' });
    }
  }));

//Get /api/movies?page=2
router.get('/',asyncHandler(async(req,res)=>{
    let {page=1} = req.query;
    page = parseInt(page,10);

    if (isNaN(page) || page < 1) {
        return res
          .status(400)
          .json({ message: 'Invalid page number. Must be a positive integer.' });
      }
    
      try {
        const data = await getMovies(page);
        res.status(200).json(data);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error.message);
        res.status(500).json({ message: 'Failed to fetch movies' });
      }
}));
//Get /api/movies/top-rate?page=2
router.get('/top-rate',asyncHandler(async(req,res)=>{
  let {page=1} = req.query;
  page = parseInt(page,10);

  if (isNaN(page) || page < 1) {
      return res
        .status(400)
        .json({ message: 'Invalid page number. Must be a positive integer.' });
    }
  
    try {
      const data = await getTopRateMovies(page);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching upcoming movies:', error.message);
      res.status(500).json({ message: 'Failed to fetch movies' });
    }
}));


//Get /api/movies/id/images 
router.get('/:id/images',asyncHandler(async(req, res)=>{
    const id = parseInt(req.params.id);
    const images = await getMovieImages(id);
    if (images) {
        res.status(200).json(images);
    } else {
        res.status(404).json({message: 'The images you requested could not be found.', status_code: 404});
    } 
}))

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await getMovie(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));


router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    try {
        // 调用 getGenres 获取类型数据
        const genresData = await getGenres();
        const genres = genresData.genres; 
        res.status(200).json(genres); // 返回 genres 列表
    } catch (error) {
        console.error("Error fetching genres:", error.message);
        res.status(500).json({ message: "Failed to fetch genres from TMDB API" });
    }
}));




export default router;
