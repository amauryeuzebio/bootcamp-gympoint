import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerOrderMail from '../jobs/AnswerOrderMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query; // se não for informado por padrão pagina 1
    const perPage = process.env.PER_PAGE_MOBILE || 5;

    const count = await HelpOrder.count({
      where: { student_id: id },
    });

    const orders = await HelpOrder.findAll({
      where: { student_id: id },
      order: [['id', 'DESC']],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const data = {
      totalPages: Math.ceil(count / perPage),
      totalRecords: count,
      pageLimit: perPage,
      orders,
    };

    return res.json(data);
  }

  async show(req, res) {
    const { id } = req.params;

    const orders = await HelpOrder.findByPk(id, {
      include: [{ model: Student, as: 'student', attributes: ['id', 'name'] }],
    });

    return res.json(orders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fail!' });
    }

    const { id } = req.params;

    const { question } = req.body;

    const student = await Student.findByPk(id);

    if (!student) {
      res.status(400).json({ error: 'Student not exists!' });
    }

    const helpOrder = await HelpOrder.create({ student_id: id, question });

    return res.json(helpOrder);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fail!' });
    }

    const { id } = req.params;

    const { answer } = req.body;

    const order = await HelpOrder.findOne({
      where: { id },
      include: [
        { model: Student, as: 'student', attributes: ['id', 'name', 'email'] },
      ],
    });

    if (!order) {
      return res.status(400).json({ error: 'Order not exists!' });
    }

    const orderAnswer = await order.update({
      answer,
      answer_at: new Date(),
    });

    const ownerSocket = req.connectedUsers[order.student.id];

    if (ownerSocket) {
      req.io.to(ownerSocket).emit('orderAnswer', orderAnswer);
    }

    const email = {
      student: order.student.name,
      email: order.student.email,
      question: order.question,
      answer: order.answer,
    };

    await Queue.add(AnswerOrderMail.key, { email });

    return res.json(order);
  }
}

export default new HelpOrderController();
