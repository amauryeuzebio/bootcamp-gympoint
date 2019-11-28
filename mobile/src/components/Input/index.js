import React, {forwardRef} from 'react';
import PropTypes from 'prop-types';

import * as S from './styles';

function Input({style, ...rest}, ref) {
  return (
    <S.Container style={style}>
      <S.Input {...rest} ref={ref} />
    </S.Container>
  );
}

Input.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

Input.defaultProps = {
  style: {},
};

export default forwardRef(Input);
