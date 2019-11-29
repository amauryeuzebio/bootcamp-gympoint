import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';
import {parseISO, formatRelative} from 'date-fns';
import pt from 'date-fns/locale/pt';

import Template from '~/components/Template';

import {checkinListRequest} from '~/store/modules/checkin/actions';

import * as S from './styles';

function Checkin({isFocused}) {
  const dispatch = useDispatch();

  const student = useSelector(state => state.auth.student);
  const checkins = useSelector(state => state.checkin.checkins);

  function loadCheckins() {
    dispatch(checkinListRequest(student.id));
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused]);

  useEffect(() => {
    console.tron.log(checkins);
  }, [checkins]);

  function handleNewCheckin() {}

  return (
    <Template>
      <S.Container>
        <S.CheckinButton onPress={handleNewCheckin}>
          Novo check-in
        </S.CheckinButton>

        <S.CheckinList
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({item, index}) => (
            <S.CheckinInfo>
              <S.Label>Check #{index + 1}</S.Label>
              <S.Time>
                {formatRelative(parseISO(item.createdAt), new Date(), {
                  locale: pt,
                  addSuffix: true,
                })}
              </S.Time>
            </S.CheckinInfo>
          )}
        />
      </S.Container>
    </Template>
  );
}

Checkin.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
};

export default withNavigationFocus(Checkin);
