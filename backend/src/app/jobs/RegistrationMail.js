import Mail from '../../lib/Mail';

class RegistrationMail {
  // variavel com acesso do objeto registrationMail.key
  get key() {
    return 'RegistrationMail';
  }

  async handle({ data }) {
    const { email } = data;

    await Mail.sendMail({
      to: `${email.student} <${email.email}>`,
      subject: 'Matricula efetuada com sucesso!',
      template: 'registration',
      context: {
        student: email.student,
        plan: email.plan,
        date: email.date,
        price: email.price,
      },
      text: 'Parabéns! Sua matricula foi efetuada com sucesso!',
    });
  }
}

export default new RegistrationMail();
