import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e=mail válido')
    .required('O e-mail é obrigratorio'),
  password: Yup.string()
    .min(6, 'No minimo 6 caracteres')
    .required('A senha é obrigatoria'),
});

export default function SignIn() {
  function handleSubimit({ email, password }) {
    console.tron.log({ email, password });
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubimit}>
        <strong>SEU EMAIL</strong>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="**********" />

        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
