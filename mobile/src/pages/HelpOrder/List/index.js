import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Template from '~/components/Template';

import {helpOrderListRequest} from '~/store/modules/helpOrder/actions';

import * as S from './styles';

function HelpOrder({navigation, isFocused}) {
  const dispatch = useDispatch();

  const student = useSelector(state => state.auth.student);
  const helpOrders = useSelector(state => state.helpOrder.helpOrders);

  function loadHelpOrder() {
    dispatch(helpOrderListRequest(student.id));
  }

  useEffect(() => {
    if (isFocused) {
      loadHelpOrder();
    }
  }, [isFocused]);

  function handleNewHelp() {
    navigation.navigate('Question');
  }

  return (
    <Template>
      <S.Container>
        <S.HelpButton onPress={handleNewHelp}>
          Novo pedido de auxilio
        </S.HelpButton>

        <S.OrderList
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <S.Order
              onPress={() => navigation.navigate('Answer', {helpOrder: item})}>
              <S.OrderInfo>
                <S.StatusInfo>
                  <Icon
                    name="check-circle"
                    color={item.answer_at ? '#42CB59' : '#999999'}
                    size={19}
                  />
                  <S.Status answered={item.answer_at}>
                    {item.answer_at ? 'Respondida' : 'Sem Resposta'}
                  </S.Status>
                </S.StatusInfo>
                <S.Time>
                  {item.answer_at
                    ? item.dateFormattedAnswerAt
                    : item.dateFormattedCreatedAt}
                </S.Time>
              </S.OrderInfo>
              <S.Question>{item.question}</S.Question>
            </S.Order>
          )}
        />
      </S.Container>
    </Template>
  );
}

HelpOrder.propTypes = {
  navigation: PropTypes.oneOfType([PropTypes.object]).isRequired,
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(HelpOrder);
