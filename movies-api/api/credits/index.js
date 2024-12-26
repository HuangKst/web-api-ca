import creditModel from "./creditModel";
import asyncHandler from 'express-async-handler';
import express, { json } from 'express';
import { getCreditDetails,getCreditMovies } from "../tmdb-api";

const router = express.Router();

//Get /api/credit/id
router.get('/:id',asyncHandler(async(req, res)=>{
    const id = parseInt(req.params.id);
    const credit = await getCreditDetails(id);
    if (credit) {
        res.status(200).json(credit);
    } else {
        res.status(404).json({message: 'The credits you requested could not be found.', status_code: 404});
    } 
}))

//Get /api/credit/id/movies
router.get('/:id/movies',asyncHandler(async(req, res)=>{
    const id = parseInt(req.params.id);
    const credit = await getCreditMovies(id);
    if (credit) {
        res.status(200).json(credit);
    } else {
        res.status(404).json({message: 'The credit movies you requested could not be found.', status_code: 404});
    } 
}))

export default router;