import * as Yup from 'yup';
import { parseISO, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Plan from '../models/Plan';
import Student from '../models/Student';
import Registration from '../models/Registration';
import Mail from '../../lib/Mail';

class RegistrationController {
  async index(req, res) {
    const registration = await Registration.findAll({
      attributes: ['id', 'price', 'start_date', 'end_date'],
      include: [
        { model: Plan, as: 'plan', attributes: ['id', 'title'] },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    return res.json(registration);
  }

  async show(req, res) {
    const { id } = req.params;

    const registration = await Registration.findAll({
      where: { id },
      attributes: ['id', 'price', 'start_date', 'end_date'],
      include: [
        { model: Plan, as: 'plan', attributes: ['id', 'title'] },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name'],
        },
      ],
    });
    return res.json(registration);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fail!' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      res.status(400).json({ error: 'Plan not exists!' });
    }

    const date = parseISO(start_date);
    const end_date = addMonths(date, plan.duration);

    const registration = await Registration.create({
      student_id,
      plan_id,
      start_date: date,
      end_date,
      price: plan.total,
    });

    const student = await Student.findByPk(student_id);

    const formattedData = format(end_date, "'dia' dd 'de' MMMM 'de' yyyy", {
      locale: pt,
    });

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Matricula efetuada com sucesso!',
      template: 'registration',
      context: {
        student: student.name,
        plan: plan.title,
        date: formattedData,
        price: plan.total,
      },
      text: 'Parabéns! Sua matricula foi efetuada com sucesso!',
    });

    return res.json(registration);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fail!' });
    }

    const { id } = req.params;

    const registration = await Registration.findByPk(id);

    const { student_id, plan_id, start_date } = req.body;

    const plan = await Plan.findByPk(plan_id);

    if (!plan) {
      res.status(400).json({ error: 'Plan not exists!' });
    }

    const date = parseISO(start_date);
    const end_date = addMonths(date, plan.duration);

    registration.update({
      student_id,
      plan_id,
      start_date: date,
      end_date,
      price: plan.total,
    });

    return res.json(registration);
  }

  async delete(req, res) {
    const { id } = req.params;

    const registration = await Registration.destroy({ where: { id } });
    return res.json(registration);
  }
}

export default new RegistrationController();
