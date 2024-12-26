import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

favouriteSchema.index({ userId: 1, movieId: 1 }, { unique: true });

const Favourite = mongoose.model("Favourite", favouriteSchema);
export default Favourite;
