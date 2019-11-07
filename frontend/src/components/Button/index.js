import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function CustomButton({ type, label, icon, color, ...rest }) {
  return (
    <Button type={type} color={color} {...rest}>
      <div>
        {icon}
        {label}
      </div>
    </Button>
  );
}

CustomButton.defaultProps = {
  type: 'button',
  icon: '',
  color: '#ee4d64',
};

CustomButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
  color: PropTypes.string,
};
