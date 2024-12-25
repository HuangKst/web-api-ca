import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express, { json } from 'express';
import {
    getUpcomingMovies,getGenres
  } from '../tmdb-api';
  
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));

// router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
//     const upcomingMovies = await getUpcomingMovies();
//     res.status(200).json(upcomingMovies);
// }));
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

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
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
