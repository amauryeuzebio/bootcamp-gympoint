import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

class UnansweredOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const perPage = process.env.PER_PAGE || 10;
    const pageNeighbours = process.env.NEIGHBOURS || 2;

    const count = await HelpOrder.count();

    const orders = await HelpOrder.findAll({
      where: {
        answer: null,
      },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
      order: ['id'],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const data = {
      totalPages: Math.ceil(count / perPage),
      totalRecords: count,
      pageLimit: perPage,
      pageNeighbours,
      orders,
    };

    return res.json(data);
  }
}

export default new UnansweredOrderController();
