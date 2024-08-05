import express, { response } from "express";
import { mongoDbUrl, PORT } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
// middleware
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Vanakkam da mapla");
});

//post book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send("Please fill all required fields");
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const postBook = await Book.create(newBook);
    console.log(request.body);
    response.status(201).send(postBook);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// get all book
app.get("/allbooks", async (request, response) => {
  try {
    const getBooks = await Book.find({});
    return response.status(200).json({
      count: getBooks.length,
      books: getBooks,
    });
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// get book by id
app.get("/idbook/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const idBook = await Book.findById(id);
    console.log(response);
    return response.status(200).send(idBook);
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

// update book

app.put("/updateBook/:id", async (request, response) => {
  try {
    const { id } = request.params;

    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send("Please fill all the fields");
    }
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      return response.status(400).send({ message: "Something went wrong" });
    }
    return response.status(200).send("book updated successfully");
  } catch (error) {
    console.log(error);
    return response.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("dai mapla database uh vanakkamda");
    app.listen(PORT, () => {
      console.log(`Vanakkam da mapla port ${PORT} la irunthu`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
