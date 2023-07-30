const jwt = require('jsonwebtoken');

const generateJWT = (id) => {
  return new Promise((res, rej) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.SECRET_JWT,
      {
        expiresIn: process.env.JWT_TIME_EXPIRE,
      },
      (err, token) => {
        if (err) {
          rej(err);
        }

        res(token);
      }
    );
  });
};

module.exports = generateJWT;
