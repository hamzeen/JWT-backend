const jwt = require('jsonwebtoken');

module.exports = {
  validateToken: (req, res, next) => {
    if (req.headers.authorization) {
      const extractedToken = req.headers.authorization.split(' ')[1]; // Bearer <token>
      const options = { expiresIn: '2d', issuer: 'http://hamzeen.github.io' };
      try {
        const result = jwt.verify(extractedToken, process.env.JWT_SECRET, options);
        req.decoded = result;
        next();
      } catch (err) {
        throw new Error(err);
      }
    } else {
      const result = { 
        error: `Authentication error. Token required.`,
        status: 401 
      };
      res.status(401).send(result);
    }
  }
};
