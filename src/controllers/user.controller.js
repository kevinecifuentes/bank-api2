const Transfer = require('./../models/transfer.model');

exports.getHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const transferReceived = await Transfer.findAll({
      where: {
        receiverUserId: id,
      },
    });

    const transferSended = await Transfer.findAll({
      where: {
        senderUserId: id,
      },
    });

    if (transferReceived.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'This id does not have tranfers history or is not sign up',
      });
    }

    return res.status(200).json({
      status: 'succes',
      message: 'transfers history found',
      transferReceived,
      transferSended,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'error',
      message: 'Error getting all registers',
      error,
    });
  }
};
