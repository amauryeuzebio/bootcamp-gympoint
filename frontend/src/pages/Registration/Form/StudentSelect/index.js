import React, { useRef, useEffect, useState, useMemo } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import api from '~/services/api';

import { Container } from './styles';

export default function StudentSelect({ name, label, setChange, getChange }) {
  const ref = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  const [selected, setSelected] = useState(defaultValue);

  function parseSelectValue(selectRef) {
    return selectRef.select.state.value;
  }

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'state.value',
      parseValue: parseSelectValue,
      clearValue: selectRef => {
        selectRef.select.clearValue();
      },
    });
  }, [ref.current, fieldName]); // eslint-disable-line

  useMemo(() => {
    setSelected(getChange);
  }, [getChange]); // eslint-disable-line

  async function loadOptions(inputValue) {
    const res = await api.get('students', {
      params: {
        q: inputValue,
        page: 1,
      },
    });

    return res.data.students.map(student => ({
      label: student.name,
      value: student.id,
    }));
  }

  function handleOnChange(student) {
    if (setChange) {
      setChange(student);
    }
  }

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}

      <AsyncSelect
        name={fieldName}
        aria-label={fieldName}
        value={selected || defaultValue}
        ref={ref}
        placeholder="Buscar aluno"
        loadOptions={loadOptions}
        defaultOptions
        onChange={student => handleOnChange(student)}
      />

      {error && <span>{error}</span>}
    </Container>
  );
}

StudentSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setChange: PropTypes.func,
  getChange: PropTypes.object,
};

StudentSelect.defaultProps = {
  setChange: PropTypes.null,
  getChange: PropTypes.null,
};
