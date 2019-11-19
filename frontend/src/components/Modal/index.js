import React from 'react';
import PropTypes from 'prop-types';

import { Container, Content } from './styles';

export default function Modal({ children, size }) {
  return (
    <Container>
      <Content size={size}>{children}</Content>
    </Container>
  );
}

Modal.defaultProps = {
  size: 'default',
};

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  size: PropTypes.string,
};
