import React from 'react';
import PropTypes from 'prop-types';
import { CustomTable } from './styles';

export default function Table({ children }) {
  return <CustomTable>{children}</CustomTable>;
}

Table.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
