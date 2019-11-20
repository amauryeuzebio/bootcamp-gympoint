import * as Yup from 'yup';
import { Op } from 'sequelize';
import { parseISO, addMonths, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Plan from '../models/Plan';
import Student from '../models/Student';
import Registration from '../models/Registration';

import RegistrationMail from '../jobs/RegistrationMail';
import Queue from '../../lib/Queue';

class RegistrationController {
  async index(req, res) {
    const { page = 1, q } = req.query; // se não for informado por padrão pagina 1
    const perPage = process.env.PER_PAGE || 10;
    const pageNeighbours = process.env.NEIGHBOURS || 2;

    const count = await Registration.count({
      where: {
        [Op.or]: [
          {
            '$student.name$': {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            '$plan.title$': {
              [Op.iLike]: `%${q}%`,
            },
          },
        ],
      },
      include: [
        { model: Plan, as: 'plan', attributes: ['id', 'title'] },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    const registration = await Registration.findAll({
      where: {
        [Op.or]: [
          {
            '$student.name$': {
              [Op.iLike]: `%${q}%`,
            },
          },
          {
            '$plan.title$': {
              [Op.iLike]: `%${q}%`,
            },
          },
        ],
      },
      attributes: ['id', 'price', 'start_date', 'end_date', 'active'],
      include: [
        { model: Plan, as: 'plan', attributes: ['id', 'title'] },
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const data = {
      totalPages: Math.ceil(count / perPage),
      totalRecords: count,
      pageLimit: perPage,
      pageNeighbours,
      registration,
    };

    return res.json(data);
  }

  async show(req, res) {
    const { id } = req.params;

    const registration = await Registration.findByPk(id, {
      attributes: ['id', 'price', 'start_date', 'end_date'],
      include: [
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'price', 'duration'],
        },
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

    const email = {
      student: student.name,
      email: student.email,
      plan: plan.title,
      date: formattedData,
      price: plan.total,
    };

    await Queue.add(RegistrationMail.key, { email });

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
