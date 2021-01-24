const jwt = require('jsonwebtoken');
const token_key = process.env.TOKEN_KEY;
const User = require('./../models/User');

function verifyToken(req, res, next) {
  // read jwt token from HTTP Header
  const token = req.headers['x-access-token'];

  // check token is empty
  if (!token) {
    return res.status(404).json({
      "status": false,
      "message": "JSON Web Token Not Found..."
    });
  }

  jwt.verify(token, token_key, function (error, decoded) {

    // check error
    if (error) {
      return res.status(401).json({
        "status": false,
        "message": "JSON Web Toke Not Decoded...",
        "error": error
      });
    }

    // check user exists or not in database
    User.findById(decoded.id, { password: 0, createdAt: 0, updatedAt: 0, profile_pic: 0 })
      .then(user => {
        // check user is empty
        if (!user) {
          return res.status(404).json({
            "status": false,
            "message": "User don't exists..."
          });
        }

        // Set user object in req object
        req.user = {
          id: user._id,
          email: user.email,
          username: user.username
        };

        return next();
      })
      .catch(error => {
        return res.status(502).json({
          "status": false,
          "message": "Database error..."
        });
      });

  });
}

module.exports = verifyToken;