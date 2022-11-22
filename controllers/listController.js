import List from "../models/listModel.js";

//CREATE
export const createList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const newList = await List.create(req.body);
      res.status(201).json(newList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You are not allowed to add list of movies!");
  }
};

//UPDATE
export const updateList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedList = await List.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You are not allowed to update the movies list! ");
  }
};

//DELETE
export const deleteList = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await List.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "The list has beed deleted..." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(403).json("You are not allowed to delete the movie!");
  }
};

//GET
export const getList = async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let list = [];
  try {
    if (typeQuery) {
      if (genreQuery) {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery, genre: genreQuery } },
        ]);
      } else {
        list = await List.aggregate([
          { $sample: { size: 10 } },
          { $match: { type: typeQuery } },
        ]);
      }
    } else {
      list = await List.aggregate([{ $sample: { size: 10 } }]);
    }

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
