import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params; // même chose que d'écrire const id = req.params.id
    const senderId = req.user._id;

    // find the convo with the receiver
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        // pas besoin de créer messages ici, on le fait dans le model
      });
    }
    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // todo socket.io functionality will go here

    // await conversation.save();
    // await newMessage.save();
    // plus rapide: they both will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(201).json({ message: "Message sent", newMessage });
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages"); // not references but actual messages

    if (!conversation) {
      return res.status(200).json({ message: [] });
    }
    const messages = conversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log("error in getMessages controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
