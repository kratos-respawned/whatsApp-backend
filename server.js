import express from "express";
import mongoose from "mongoose";
const app = express();
import Messages from "./dbMessage.js";
import Pusher from "pusher";
import cors from "cors";
const port = process.env.PORT || 5274;
const pusher = new Pusher({
  appId: "1444124",
  key: "a25c95cbd5b71ace78dd",
  secret: "18293665311df6ff240e",
  cluster: "ap2",
  useTLS: true,
});

//db
const url =
  "mongodb+srv://kratos1710:TdHT8KKCKXOLXueB@cluster0.cuzbp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();
  changeStream.on("change", (change) => {
    console.log("a change occured");
    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("message", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
      });
    } else {
      console.log("err");
    }
  });
});

//
//routes
app.get("/", (req, res) => {
  res.status(200).send("Hello World");
});
//middleware
app.use(express.json());
app.use(cors());

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

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// TdHT8KKCKXOLXueB;
