import React, { useRef, useEffect, useState, useMemo } from 'react';
import ReactDatePicker, { registerLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt';

import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import 'react-datepicker/dist/react-datepicker.css';

import { Container } from './styles';

export default function DatePicker({
  name,
  disabled,
  setChange,
  getChange,
  label,
}) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);
  registerLocale('pt-BR', pt);

  function handleOnChange(date) {
    setSelected(date);
    setChange(date);
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  useMemo(() => {
    setSelected(getChange);
  }, [getChange]);

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => handleOnChange(date)}
        locale="pt-BR"
        dateFormat="P"
        disabled={!!disabled}
        ref={ref}
      />
      {error && <span>{error}</span>}
    </Container>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  getChange: PropTypes.objectOf(PropTypes.string),
  setChange: PropTypes.func,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

DatePicker.defaultProps = {
  disabled: PropTypes.false,
  setChange: PropTypes.null,
  getChange: PropTypes.null,
};
