import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';

import Template from '~/components/Template';

import {helpOrderRequest} from '~/store/modules/helpOrder/actions';

import * as S from './styles';

export default function Question({navigation}) {
  const dispatch = useDispatch();
  const student = useSelector(state => state.auth.student);
  const loading = useSelector(state => state.helpOrder.loading);

  const [question, setQuestion] = useState('');

  function handleSubmit() {
    dispatch(helpOrderRequest({id: student.id, question, navigation}));
  }

  return (
    <Template isGoBack page={() => navigation.goBack()}>
      <S.Container>
        <S.QuestionInput
          textAlignVertical="top"
          placeholder="Digite seu pedido de auxílio"
          numberOfLines={10}
          multiline
          value={question}
          onChangeText={setQuestion}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <S.SubmitButton
          enabled={!loading}
          loading={loading}
          onPress={handleSubmit}>
          Enviar Pedido
        </S.SubmitButton>
      </S.Container>
    </Template>
  );
}

Question.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
