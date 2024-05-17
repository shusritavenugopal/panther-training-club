const BookTrainer = require("../models/BookTrainer");

const bookTrainerController = {
  bookTrainer: async (req, res) => {
    try {
      const booking = new BookTrainer(req.body);
      await booking.save();
      res.status(201).send({ message: "Trainer booking created successfully!" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  getAllBookings: async (req, res) => {
    try {
      const booking = await BookTrainer.find();
      res.status(200).send(booking);
    } catch (error) {
      res.status(500).send(error);
    }
  }
};

module.exports = bookTrainerController;