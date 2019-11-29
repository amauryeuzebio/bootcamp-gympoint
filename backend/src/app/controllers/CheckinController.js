import { subDays } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
  async index(req, res) {
    const checkins = await Checkin.findAll({
      where: {
        student_id: req.params.id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });
    return res.json(checkins);
  }

  async store(req, res) {
    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(400).json({ error: 'Student not exists!' });
    }

    const countCheckins = await Checkin.count({
      where: {
        student_id: id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (countCheckins > 6) {
      return res.status(400).json({ error: 'Checkins amount exceeded!' });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.json({ checkin });
  }
}

export default new CheckinController();
