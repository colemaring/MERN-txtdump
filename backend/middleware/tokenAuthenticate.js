const jwt = require("jsonwebtoken");
require("dotenv").config();

// middleware to authenticate JWT tokens in requests
const authenticateJWTToken = (request, response, next) => {
  // this will extract the authorization header form any incoming request
  const authHeader = request.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    const secretKey = process.env.JWT_SECRET;

    // verifies if the token is using the secret key
    jwt.verify(token, secretKey, (error, decodedUser) => {
      if (error) {
        console.error(error);
        return response.sendStatus(403); // Forbidden
      }

      // attach the decoded user info to the request then proceed to next middleware
      request.user = decodedUser;
      console.log("user authenticated");
      next();
    });
  } else {
    console.log("user not authenticated");
    response.sendStatus(401); // Unauthorized
  }
};

module.exports = authenticateJWTToken;
