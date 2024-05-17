const Trainer = require("../models/Trainer");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;  
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; 

const trainerController = {
  // Create a new trainer account
  createTrainerAccount: async (req, res) => {
    console.log(req);
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const trainer = new Trainer({
        ...req.body,
        password: hashedPassword,
      });

      // Save the trainer to the database
      await trainer.save();
      res.status(201).send({ message: "Trainer account created successfully!" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  login: async (req, res) => {
  try {
    const trainer = await Trainer.findOne({ email: req.body.email });
    if (!trainer) {
      return res.status(401).send({ message: "Trainer not found." });
    }

    const isMatch = await bcrypt.compare(req.body.password, trainer.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect password has been given. Try Again!" });
    }

    const token = jwt.sign({ id: trainer._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).send({
      token,
      trainerId: trainer._id,  
      trainerName: trainer.name,
      message: "Logged in successfully"
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
},
  getProfile: async (req, res) => {
    try {
      const trainer = await Trainer.findById(req.trainer.id);
      if (!trainer) {
        return res.status(404).send({ message: "Trainer not found." });
      }

      // Exclude the password and any other sensitive info
      const { password, ...trainerData } = trainer.toObject();
      res.send({ trainer: trainerData });
    } catch (error) {
      res.status(500).send({ message: "Internal server error.", error: error.message });
    }
},
  getTrainerById: async (req, res) => {
  try {
    const trainerId = req.params.id; // Get the restaurant ID from the request parameters
    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).send({ message: 'Trainer not found' });
    }

    res.status(200).send(trainer);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error.', error: error.message });
  }
},
  updateTrainerProfile: async (req, res) => {
    try {
      const updatedTrainer = await Trainer.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedTrainer) {
        return res.status(404).send({ message: "Trainer not found" });
      }
      res.status(200).send(updatedTrainer);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getAllTrainers: async (req, res) => {
    try {
      const trainer = await Trainer.find();
      res.status(200).send(trainer);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getTrainerById: async (req, res) => {
  try {
    const trainerId = req.params.id; // Get the restaurant ID from the request parameters
    const trainer = await Trainer.findById(trainerId);

    if (!trainer) {
      return res.status(404).send({ message: 'Trainer not found' });
    }

    res.status(200).send(trainer);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error.', error: error.message });
  }
}
};
module.exports = trainerController;