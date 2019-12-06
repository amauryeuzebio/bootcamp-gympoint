import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Template from '~/components/Template';

import {
  helpOrderListRequest,
  helpOrderReset,
} from '~/store/modules/helpOrder/actions';

import * as S from './styles';

function HelpOrder({navigation, isFocused}) {
  const dispatch = useDispatch();

  const student = useSelector(state => state.auth.student);
  const helpOrders = useSelector(state => state.helpOrder.helpOrders);
  const totalPages = useSelector(state => state.helpOrder.totalPages);
  const loading = useSelector(state => state.helpOrder.loading);
  const refresh = useSelector(state => state.helpOrder.refresh);

  const [page, setPage] = useState(1);

  function loadHelpOrder(pageNumber = page) {
    if (totalPages === 0) {
      dispatch(helpOrderListRequest({id: student.id, page: 1}));
      setPage(2);
    }

    if (pageNumber <= totalPages) {
      dispatch(helpOrderListRequest({id: student.id, page: pageNumber}));

      setPage(pageNumber + 1);
    }
  }

  useEffect(() => {
    if (refresh) {
      setPage(1);
    }
  }, [refresh]);

  useEffect(() => {
    if (isFocused) {
      loadHelpOrder();
    }
  }, [isFocused]);

  useEffect(() => {
    // will Unmount
    return () => {
      dispatch(helpOrderReset());
    };
    // eslint-disable-next-line
  }, [])

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
          onEndReached={() => loadHelpOrder()}
          onEndReachedThreshold={0.1}
          ListFooterComponent={loading && <S.Loading />}
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
