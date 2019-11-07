import React from 'react';
import PropTypes from 'prop-types';
import { CustomRow } from './styles';

export default function Row({ children, ...rest }) {
  return <CustomRow {...rest}>{children}</CustomRow>;
}

Row.propTypes = {
  children: PropTypes.element.isRequired,
};
