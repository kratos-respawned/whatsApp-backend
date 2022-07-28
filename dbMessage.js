import mongoose from "mongoose";
const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  time: String,
  received: Boolean,
});
const Messages = mongoose.model("messageContent", whatsappSchema);
export default Messages;
