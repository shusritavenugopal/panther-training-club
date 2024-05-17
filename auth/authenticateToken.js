const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; 

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1]; 
  console.log(token);
  if (token == null) {
    return res.sendStatus(401); 
  }

  jwt.verify(token, JWT_SECRET, (err, customer) => {
    if (err) {
      return res.sendStatus(403); 
    }
    console.log(customer);
    req.customer = customer;
    next();
  });
};

module.exports = authenticateToken;