require('dotenv').config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const booksRoute = require("./routes/books");

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());

app.use("/api/buku", booksRoute);

app.listen(4000, () => {
    console.log("Server berjalan pada port 4000");
});
