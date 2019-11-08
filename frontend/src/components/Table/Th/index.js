import React from 'react';
import PropTypes from 'prop-types';
import { CustomTh } from './styles';

export default function Th({ children, ...rest }) {
  return <CustomTh {...rest}>{children}</CustomTh>;
}

Th.defaultProps = {
  children: '',
};

Th.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};
