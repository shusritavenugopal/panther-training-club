const Administrator = require("../models/Administrator");
const Trainer = require("../models/Trainer");
const Member = require("../models/Member");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;  
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; 

const AdministratorController = {
  // Create a new admin account
  createAdminAccount: async (req, res) => {
    console.log(req);
    try {
      // Generate a salt and hash the password before saving the admin
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Create a new admin instance with the hashed password
      const admin = new Administrator({
        ...req.body,
        password: hashedPassword,
      });

      // Save the admin to the database
      await admin.save();
      res.status(201).send({ message: "Admin account created successfully!" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  login: async (req, res) => {
  try {
    const administrator = await Administrator.findOne({ email: req.body.email });
    if (!administrator) {
      return res.status(401).send({ message: "Administrator not found." });
    }

    const isMatch = await bcrypt.compare(req.body.password, administrator.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect password has been given. Try Again!" });
    }

    // Create JWT token
    const token = jwt.sign({ id: administrator._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).send({
      token,
      administratorId: administrator._id,  
      administratorName: administrator.name,
      message: "Logged in successfully"
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}, 
  viewAllTrainers: async (req, res) => {
  try {
      const trainers = await Trainer.find();
      res.json({ trainers });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
},
  
  viewAllMembers: async (req, res) => {
  try {
      const members = await Member.find();
      res.json({ members });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error', error: error.message });
  }
},
deleteMember: async (req, res) => {
    try {
      const deletedCustomer = await Member.findByIdAndDelete(
        req.params.id
        
      );
      alert(req.params.id)
      if (!deletedCustomer) {
        return res.status(404).send({ message: "Member not found" });
      }
      res.status(200).send({ message: "Member deleted successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  },
  deleteTrainer: async (req, res) => {
    try {
      const deletedTrainer = await Trainer.findByIdAndDelete(
        req.params.id
      );
      alert(req.params.id)
      if (!deletedTrainer) {
        return res.status(404).send({ message: "Trainer not found" });
      }
      res.status(200).send({ message: "Trainer deleted successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  }
};
module.exports = AdministratorController;