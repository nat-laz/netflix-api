import { Schema, model } from "mongoose";

const listSchema = Schema(
  {
    title: { type: String, required: true, uniqu: true },
    type: { type: String},
    genre: {type: String},
    content: {type: Array}
  },
  { timestamps: true }
);

const List = model("List", listSchema)

export default List;