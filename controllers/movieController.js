import Movie from "../models/movieModel.js";

//CREATE
export const addMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const addMovie = await Movie.create(req.body);
      res.status(201).json(addMovie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You are not allowed to add a movie!");
  }
};

//UPDATE
export const updateMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You are not allowed to update the movie!");
  }
};

//DELETE
export const deleteMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The movie has beed deleted..." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You are not allowed to delete the movie!");
  }
};

//GET
export const getMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//GET ALL MOVIES
export const getAllMovie = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const movies = await Movie.find();
      res.status(200).json(movies);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
};

//GET RANDOM MOVIE
export const getRandomMovie = async (req, res) => {
  const type = req.query.type;
  let movie;
  try {
    if (type === "series") {
      movie = await Movie.aggregate([
        { $match: { isSeries: true } },
        { $sample: { size: 1 } },
      ]);
    } else {
      movie = await Movie.aggregate([
        { $match: { isSeries: false } },
        { $sample: { size: 1 } },
      ]);
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
