import Mail from '../../lib/Mail';

class AnswerOrderMail {
  get key() {
    return 'AnswerOrderMail';
  }

  async handle({ data }) {
    const { email } = data;

    await Mail.sendMail({
      to: `${email.student} <${email.email}>`,
      subject: 'Ordem de ajuda respondida!',
      template: 'answerOrderHelp',
      context: {
        student: email.student,
        question: email.question,
        answer: email.answer,
      },
      text: 'Sua duvida foi resolvida',
    });
  }
}

export default new AnswerOrderMail();
