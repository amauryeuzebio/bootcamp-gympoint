import React, { useRef, useEffect, useState, useMemo } from 'react';
import AsyncSelect from 'react-select/async';
import PropTypes from 'prop-types';

import { useField } from '@rocketseat/unform';

import api from '~/services/api';

import { Container } from './styles';

export default function PlanSelect({ name, label, setChange, getChange }) {
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
    const res = await api.get('plans', {
      params: {
        q: inputValue,
        page: 1,
      },
    });

    return res.data.plans.map(plan => ({
      label: plan.title,
      value: plan.id,
      duration: plan.duration,
      price: plan.price,
    }));
  }

  function handleOnChange(plan) {
    if (setChange) {
      setChange(plan);
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
        placeholder="Buscar Plano"
        loadOptions={loadOptions}
        defaultOptions
        onChange={plan => handleOnChange(plan)}
      />

      {error && <span>{error}</span>}
    </Container>
  );
}

PlanSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  setChange: PropTypes.func,
  getChange: PropTypes.object,
};

PlanSelect.defaultProps = {
  setChange: PropTypes.null,
  getChange: PropTypes.null,
};
