import express from "express";
import mongoose from "mongoose";
const app = express();
import Messages from "./dbMessage.js";
const port = process.env.PORT || 5000;
//db
const url =
  "mongodb+srv://kratos1710:TdHT8KKCKXOLXueB@cluster0.cuzbp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
//middleware
app.use(express.json());
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// TdHT8KKCKXOLXueB;
