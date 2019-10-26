import HelpOrder from '../models/HelpOrder';

class UnansweredOrderController {
  async index(req, res) {
    const orders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
    });

    return res.json(orders);
  }
}

export default new UnansweredOrderController();
