const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateJWTToken = (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;

    jwt.verify(token, secretKey, (error, decodedUser) => {
      if (error) {
        console.error(error);
        return response.sendStatus(403); // Forbidden
      }
      
      request.user = decodedUser;
      console.log("user authenticated");
      next();
    });
  } else {
    response.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWTToken;