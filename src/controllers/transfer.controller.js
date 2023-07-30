const Transfer = require('./../models/transfer.model');
const User = require('./../models/user.model');

exports.sendTransfer = async (req, res) => {
  try {
    const { senderUserId, receiverUserId, amount } = req.body;
    const { accountNumber } = req.body;

    const user = await User.findOne({
      where: {
        accountNumber,
      },
    });

    const senderUser = await User.findOne({
      where: {
        id: senderUserId,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'transfer not found',
      });
    }

    if (senderUser.amount < amount) {
      return res.status(403).json({
        status: 'invalid',
        message: 'you do not have enough money in your account',
      });
    }

    const transferCreated = await Transfer.create({
      accountNumber,
      senderUserId,
      receiverUserId,
      amount,
    });

    const newAmountSenderUser = senderUser.amount - amount;
    await senderUser.update({ amount: newAmountSenderUser });

    const newAmountReceiverUser = user.amount + amount;
    await user.update({ amount: newAmountReceiverUser });

    return res.status(200).json({
      status: 'transfer send succesfully',
      transferCreated,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'something went wrong',
      error,
    });
  }
};
