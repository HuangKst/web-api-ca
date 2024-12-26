import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ActorSchema = new Schema({
  id: { type: Number, required: true, unique: true }, // Actor's unique ID from TMDB
  name: { type: String, required: true }, // Actor's name
  gender: { type: Number }, // Gender (e.g., 1 for female, 2 for male, 0 for not specified)
  profile_path: { type: String }, // URL path to the actor's profile image
  popularity: { type: Number }, // Popularity score
  known_for_department: { type: String }, // Primary profession (e.g., Acting, Directing)
  biography: { type: String }, // Actor's biography
  birthday: { type: String }, // Date of birth
  deathday: { type: String }, // Date of death (if applicable)
  place_of_birth: { type: String }, // Place of birth
  imdb_id: { type: String }, // IMDb ID for external linking
  cast_movies: [{
    movie_id: { type: Number }, // Reference to the movie ID
    character: { type: String }, // Character played in the movie
    credit_id: { type: String }, // TMDB credit ID
  }],
  crew_movies: [{
    movie_id: { type: Number }, // Reference to the movie ID
    department: { type: String }, // Department (e.g., Directing, Writing)
    job: { type: String }, // Specific job title (e.g., Director, Writer)
    credit_id: { type: String }, // TMDB credit ID
  }],
});

// Static method to find actor by their TMDB ID
ActorSchema.statics.findByActorDBId = function (id) {
  return this.findOne({ id: id });
};

export default mongoose.model('Actors', ActorSchema);
