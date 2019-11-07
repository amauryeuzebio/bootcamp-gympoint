import React from 'react';
import PropTypes from 'prop-types';
import { CustomTd } from './styles';

export default function Td({ children, ...rest }) {
  return <CustomTd {...rest}>{children}</CustomTd>;
}

Td.propTypes = {
  children: PropTypes.element.isRequired,
};
