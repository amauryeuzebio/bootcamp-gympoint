import React from 'react';
import PropTypes from 'prop-types';

import Template from '~/components/Template';

import * as S from './styles';

export default function Answer({navigation}) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Template isGoBack page={() => navigation.goBack()}>
      <S.Container>
        <S.Panel>
          <S.QuestionInfo>
            <S.QuestionHeader>
              <S.Title>PERGUNTA</S.Title>
              <S.Time>{helpOrder.dateFormattedCreatedAt}</S.Time>
            </S.QuestionHeader>
            <S.Description>{helpOrder.question}</S.Description>
          </S.QuestionInfo>

          <S.AnswerInfo>
            <S.AnswerHeader>
              <S.Title>RESPOSTA</S.Title>
              <S.Time>{helpOrder.dateFormattedAnswerAt}</S.Time>
            </S.AnswerHeader>

            <S.Description>{helpOrder.answer}</S.Description>
          </S.AnswerInfo>
        </S.Panel>
      </S.Container>
    </Template>
  );
}

Answer.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
