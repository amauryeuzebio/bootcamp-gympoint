import * as Yup from 'yup';
import { Op } from 'sequelize';

import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { page = 1, q } = req.query; // se não for informado por padrão pagina 1
    const perPage = process.env.PER_PAGE || 10;
    const pageNeighbours = process.env.NEIGHBOURS || 2;

    const count = await Student.count({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
    });

    const students = await Student.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      order: ['name'],
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

    const student = await Student.findByPk(id);

    return res.json(student);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fail!' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'E-mail already used by another student!' });
    }

    const student = await Student.create(req.body);
    return res.json(student);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validate fail!' });
    }

    const { email } = req.body;
    const student = await Student.findByPk(req.params.id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exists!' });
    }

    if (req.body.email !== student.email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res
          .status(400)
          .json({ error: 'E-mail already used by another student!' });
      }
    }

    const { id, name } = await student.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const { id } = req.params;

    const student = await Student.destroy({ where: { id } });
    return res.json(student);
  }
}

export default new StudentController();
