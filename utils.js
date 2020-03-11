const jwt = require('jsonwebtoken');

module.exports = {
  validateToken: (req, res, next) => {

    // JWT SECRET SIGN KEY
    const secret = 'MY JWT SECRET';

    // we get these during login request
    const user = {
      username: 'Matt',
      password: 'Preston'
    };


    if (req.headers.authorization) {

      // A. AT LOGIN REQUEST (if user's found & password is correct)...

      // 1. Create a token
      const payload = { user: user.username };
      const options = { expiresIn: '2d', issuer: 'https://hamzeen.github.io' };
      const token =   jwt.sign(payload, secret, options);

      console.log('JWT CREATED FOR USER ('+ user.username + ') :: ');
      console.log(token);


      // B. Simulates auth header. Normally Front-End would do this :-)
      const authorizationHeader = 'Bearer ' + token;


      // C. AT THE REQUEST FOR A SECURED/RESTRICTED API...

      // 1. extract the JWT from request header
      const extractedToken = authorizationHeader.split(' ')[1];
      // 2. Verify it! (do. this in a TRY-CATCH block)
      const verifiedToken = jwt.verify(extractedToken, secret, options);

      // 3. this has expiry date & the payload (ex: username) against which it was issued
      console.log('verified token::: \n', verifiedToken);


      // SENDS A MOCK RESPONSE FOR GRACEFUL EXIT OF THIS REQUEST
      const result = {
        message: `OK SUCCESS`,
        status: 200
      };
      res.status(200).send(result);
    } else {
      const result = {
        error: `Authentication error. Token required.`,
        status: 401
      };
      res.status(401).send(result);
    }
  }
};
