import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';

import * as S from './styles';

export default function Layout({children, isGoBack, page}) {
  return (
    <S.Wrapper>
      <Header isGoBack={isGoBack} page={page} />
      <S.Container>{children}</S.Container>
    </S.Wrapper>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  isGoBack: PropTypes.bool,
  page: PropTypes.func,
};

Layout.defaultProps = {
  isGoBack: false,
  page: () => {},
};
