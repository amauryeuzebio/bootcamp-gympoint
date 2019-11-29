import React from 'react';
import PropTypes from 'prop-types';
import {useDispatch} from 'react-redux';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {signOut} from '~/store/modules/auth/actions';

import logo from '~/assets/logo2.png';

import * as S from './styles';

export default function Header({isGoBack, page}) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <S.Container>
      {isGoBack ? (
        <S.GoBack onPress={() => page}>
          <Icon name="chevron-left" size={30} color="#ee4e62" />
        </S.GoBack>
      ) : (
        <View />
      )}

      <S.Logo source={logo} />
      <S.Logout onPress={handleLogout}>
        <Icon name="exit-to-app" size={30} color="#ee4e62" />
      </S.Logout>
    </S.Container>
  );
}

Header.propTypes = {
  isGoBack: PropTypes.bool,
  page: PropTypes.func,
};

Header.defaultProps = {
  isGoBack: false,
  page: () => {},
};
