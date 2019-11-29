import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import logo from '~/assets/logo2.png';

import * as S from './styles';

export default function Header({isGoBack, page}) {
  return (
    <S.Container>
      {isGoBack && (
        <S.GoBack onPress={() => page}>
          <Icon name="chevron-left" size={30} color="#ee4e62" />
        </S.GoBack>
      )}

      <S.Logo source={logo} />
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
