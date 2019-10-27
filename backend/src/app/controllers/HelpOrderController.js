import * as Yup from 'yup';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

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

    await Mail.sendMail({
      to: `${order.student.name} <${order.student.email}>`,
      subject: 'Ordem de ajuda respondida!',
      template: 'answerOrderHelp',
      context: {
        student: order.student.name,
        question: order.question,
        answer: order.answer,
      },
      text: 'Sua duvida foi resolvida',
    });

    return res.json(order);
  }
}

export default new HelpOrderController();
