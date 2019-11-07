import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function CustomButton({ type, label, icon }) {
  return (
    <Button type={type}>
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
};

CustomButton.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string.isRequired,
  icon: PropTypes.element,
};
