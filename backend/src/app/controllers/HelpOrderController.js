import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import AnswerOrderMail from '../jobs/AnswerOrderMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async index(req, res) {
    const { id } = req.params;

    const orders = await HelpOrder.findAll({ where: { student_id: id } });

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

    order.update({
      answer,
      answer_at: new Date(),
    });

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
