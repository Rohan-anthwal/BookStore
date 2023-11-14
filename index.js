import express from "express";
import { PORT, dburl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./modles/bookmodel.js"
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json())


app.get("/", (req,res) => {
 console.log(req);
 return res.status(234).send("Welcome to MERN stack dev")
})

//Route to post books
app.post("/books",async(req,res) => {
  try{
  if(
  !req.body.title ||
  !req.body.author ||
  !req.body.publishYear 
) {
  return res.status(400).send({
    message:"Send all required fields: title,author,publishYear",
  })
}
const newBook = {
  title: req.body.title,
  author: req.body.author,
  publishYear: req.body.publishYear,
};
const book = await Book.create(newBook);

return res.status(201).send(book);
  }catch(error){
    console.log(error);
    response.status(500).send({message: error.message})
  }
})

//route to get all Books

app.get("/books",async(req,res) => {
  try{
const books = await Book.find({});
return res.status(200).json(books);
  }
  catch(error){
console.log(error.message);
response.status(500).send({message:error.message});
  }
})

  mongoose.connect(dburl)
  .then(() => {
console.log("App Connected to DB")
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})

  })
  .catch((error) => {
console.log(error);
  });