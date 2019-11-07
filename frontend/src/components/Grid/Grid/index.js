import React from 'react';
import PropTypes from 'prop-types';
import { CustomGrid } from './styles';

export default function Grid({ children, ...rest }) {
  return <CustomGrid {...rest}>{children}</CustomGrid>;
}

Grid.propTypes = {
  children: PropTypes.element.isRequired,
};
