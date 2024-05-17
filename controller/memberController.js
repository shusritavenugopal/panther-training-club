const Member = require("../models/Member");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;  
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN; 

const memberController = {
  // Create a new Member account
  createMemberAccount: async (req, res) => {
    console.log(req);
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const member = new Member({
        ...req.body,
        password: hashedPassword,
      });

      await member.save();
      res.status(201).send({ message: "Member account created successfully!" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  },
  login: async (req, res) => {
  try {
    const member = await Member.findOne({ email: req.body.email });
    if (!member) {
      return res.status(401).send({ message: "Member not found." });
    }

    const isMatch = await bcrypt.compare(req.body.password, member.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect password has been given. Try Again!" });
    }

    // Create JWT token
    const token = jwt.sign({ id: member._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    res.status(200).send({
      token,
      memberId: member._id,  
      memberName: member.name,
      message: "Logged in successfully"
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
},
  getProfile: async (req, res) => {
    try {
      const member = await Member.findById(req.member.id);
      if (!member) {
        return res.status(404).send({ message: "Member not found." });
      }

      const { password, ...memberData } = member.toObject();
      res.send({ member: memberData });
    } catch (error) {
      res.status(500).send({ message: "Internal server error.", error: error.message });
    }
},
  getMemberById: async (req, res) => {
  try {
    const memberId = req.params.id; // Get the restaurant ID from the request parameters
    const member = await Member.findById(memberId);

    if (!member) {
      return res.status(404).send({ message: 'Member not found' });
    }

    res.status(200).send(member);
  } catch (error) {
    res.status(500).send({ message: 'Internal server error.', error: error.message });
  }
},
  updateMemberProfile: async (req, res) => {
    try {
      const updatedMember = await Member.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedMember) {
        return res.status(404).send({ message: "Trainer not found" });
      }
      res.status(200).send(updatedMember);
    } catch (error) {
      res.status(500).send(error);
    }
  },
  getAllMembers: async (req, res) => {
    try {
      const member = await Member.find();
      res.status(200).send(member);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};
module.exports = memberController;