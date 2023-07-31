const User = require('./../models/user.model');
const randomNumber = require('./../utils/getRandomNumber');
const bcrypt = require('bcryptjs');
const generateJWT = require('./../utils/jwt');

//signUp
exports.createUser = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'name and password are required',
      });
    }

    const salt = await bcrypt.genSalt(13);
    const encryptPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name: name.toLowerCase().trim(),
      password: encryptPassword,
      accountNumber: randomNumber(),
    });

    const token = await generateJWT(user.id);

    return res.status(200).json({
      status: 'succes',
      message: 'user has been created',
      token,
      user: {
        name,
        accountNumber: user.accountNumber,
        amount: user.amount,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
      error,
    });
  }
};

//signIn
exports.loginUser = async (req, res, next) => {
  try {
    //1 bring the account number and possword from the body
    const { accountNumber, password } = req.body;

    //2 search user and validate if the user exists
    const user = await User.findOne({
      where: {
        accountNumber: accountNumber.trim(),
        status: 'active',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found',
      });
    }

    //3. validate if password is correct,
    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(404).json({
        status: 'error',
        message: 'acount number or password incorrect',
      });
    }

    return res.status(200).json({
      status: 'login succes',
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong!',
    });
  }
};
