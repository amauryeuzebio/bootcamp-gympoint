import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Image} from 'react-native';

import {signInRequest} from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import * as S from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const [id, setId] = useState();

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <S.Container>
      <Image source={logo} />

      <S.Form>
        <S.FormInput
          placeholder="Informe seu ID de cadastro"
          keyboardType="number-pad"
          returnKeyType="send"
          value={id}
          onChangeText={setId}
        />
        <S.SubmitButton loading={false} onPress={handleSubmit}>
          Entrar no sistema
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
}
