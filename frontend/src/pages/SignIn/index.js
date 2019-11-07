import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signInRequest } from '~/store/modules/auth/actions';

import { Button } from './styles';

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
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();

  function handleSubimit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubimit}>
        <strong>SEU EMAIL</strong>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="**********" />
        <Button type="submit" disabled={loading}>
          {loading ? 'Carregando...' : 'Entrar no sistemas'}
        </Button>
      </Form>
    </>
  );
}
