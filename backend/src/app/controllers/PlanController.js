import * as Yup from 'yup';
import { Op } from 'sequelize';

import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const { page = 1, q } = req.query; // se não for informado por padrão pagina 1
    const perPage = process.env.PER_PAGE || 10;
    const pageNeighbours = process.env.NEIGHBOURS || 2;

    const count = await Plan.count({
      where: {
        title: {
          [Op.iLike]: `%${q}%`,
        },
      },
    });

    const students = await Plan.findAll({
      where: {
        title: {
          [Op.iLike]: `%${q}%`,
        },
      },
      order: ['title'],
      limit: perPage,
      offset: (page - 1) * perPage,
    });

    const data = {
      totalPages: Math.ceil(count / perPage),
      totalRecords: count,
      pageLimit: perPage,
      pageNeighbours,
      students,
    };

    return res.json(data);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    if (!plan) {
      return res.status(400).json({ error: 'Plan not exists!' });
    }

    return res.json(plan);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fail!' });
    }

    const plan = await Plan.create(req.body);

    return res.json({ plan });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number().required(),
      price: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fail!' });
    }

    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const { id } = req.params;

    const plan = await Plan.destroy({ where: { id } });
    return res.json(plan);
  }
}

export default new PlanController();
