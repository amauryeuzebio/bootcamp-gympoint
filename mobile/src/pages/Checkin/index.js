import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {withNavigationFocus} from 'react-navigation';

import Template from '~/components/Template';

import {
  checkinListRequest,
  checkinRequest,
} from '~/store/modules/checkin/actions';

import * as S from './styles';

function Checkin({isFocused}) {
  const dispatch = useDispatch();

  const student = useSelector(state => state.auth.student);
  const checkins = useSelector(state => state.checkin.checkins);
  const loading = useSelector(state => state.checkin.loading);

  function loadCheckins() {
    dispatch(checkinListRequest(student.id));
  }

  useEffect(() => {
    if (isFocused) {
      loadCheckins();
    }
  }, [isFocused]);

  function handleNewCheckin() {
    dispatch(checkinRequest(student.id));
  }

  return (
    <Template>
      <S.Container>
        <S.CheckinButton loading={loading} onPress={handleNewCheckin}>
          Novo check-in
        </S.CheckinButton>
        <S.List>
          <S.CheckinList
            data={checkins}
            keyExtractor={item => String(item.id)}
            renderItem={({item, index}) => (
              <S.CheckinInfo>
                <S.Label>Check #{index + 1}</S.Label>
                <S.Time>{item.dateFormatted}</S.Time>
              </S.CheckinInfo>
            )}
          />
        </S.List>
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
