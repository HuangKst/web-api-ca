// index.js
import express from "express";
import Favourite from "./FavouriteModel.js";

const router = express.Router();

// 1) 获取某个用户的所有收藏
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // 查出该用户的所有收藏
    const favourites = await Favourite.find({userId });
    res.status(200).json(favourites);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error to fetch the favourite movies information " });
  }
});

// 2) 给某个用户添加收藏
router.post("/", async (req, res) => {
  const { userId, movieId } = req.body;
  try {
    // 检查数据库里是否已存在相同记录
    const existing = await Favourite.findOne({ userId, movieId });
    if (existing) {
      return res
        .status(400)
        .json({ message: "The movie has collected" });
    }

    const newFavourite = new Favourite({ userId, movieId });
    await newFavourite.save();
    res.status(201).json({
      success:"true",
      message: "Favourite the movie successfully ",
      favourite: newFavourite,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error to collect the movie" });
  }
});

// 3) 删除某个用户对某部电影的收藏
router.delete("/:userId/:movieId", async (req, res) => {
  const { userId, movieId } = req.params;
  try {
    const deleted = await Favourite.findOneAndDelete({ userId, movieId });
    if (!deleted) {
      return res.status(404).json({ message: "No collection recording" });
    }
    res.status(200).json({ success:"true",message: "Delete the collecting moive" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error to delete the movie" });
  }
});

export default router;
