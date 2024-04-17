import mongoose from "mongoose";


/**
 * @swagger
 * components:
 *  schemas:
 *    Movie:
 *      type: object
 *      properties:
 *        _id:
 *          type: string
 *        title:
 *          type: string
 *        realaseDate:
 *          type: string
 *        poster:
 *          type: string
 *        trailerLink:
 *          type: string
 *        year:
 *          type: string
 *        genres:
 *          type: array
 *      
 */

const MovieSchema = new mongoose.Schema({
 
  title: { type: String, required: true },
  releaseDate: { type: String, required: true },
  year: { type: Number, required: true }, 
  trailerLink: { type: String, required: true },
  poster: { type: String, required: true },
  genres: { type: [String], required: true },

});
export default mongoose.model("Movie", MovieSchema);