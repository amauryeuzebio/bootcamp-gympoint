import Student from '../models/Student';
import Registration from '../models/Registration';

class StudentLoginController {
  async show(req, res) {
    const { id } = req.params;

    const registration = await Registration.findOne({
      where: { student_id: id },
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['id', 'DESC']],
    });

    if (!registration || !registration.active) {
      return res.status(401).json({ error: 'Registration not found' });
    }

    return res.json(registration.student);
  }
}

export default new StudentLoginController();
