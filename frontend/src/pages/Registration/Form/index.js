import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { format, addMonths } from 'date-fns';
import { MdDone, MdArrowBack } from 'react-icons/md';

import {
  registrationsSaveRequest,
  resetForm,
} from '~/store/modules/registration/actions';

import Button from '~/components/Button';
import { Grid, Row, Column } from '~/components/Grid';
import DatePicker from '~/components/DatePicker';
import PlanSelect from './PlanSelect';
import StudentSelect from './StudentSelect';
import { formatCurrencyBR, formatDateIso } from '~/util/format';

import { Container, Header, Body, Controls, ReadInput } from './styles';

const schema = Yup.object().shape({
  student_id: Yup.object()
    .required('Aluno é obrigatorio!')
    .nullable(),
  plan_id: Yup.object()
    .required('Plano é obrigatorio')
    .nullable(),
  start_date: Yup.date().required('Data de inicio é obrigatorio'),
});

export default function FormRegistration({ match }) {
  const { id } = useParams();
  const formRegistration = useSelector(state => state.registration.form);

  const dispatch = useDispatch();
  const [registration, setRegistration] = useState();
  const [startDate, setStartDate] = useState();
  const [newPlan, setNewPlan] = useState();
  const [newStudent, setNewStudent] = useState();
  const [total, setTotal] = useState();

  useEffect(() => {
    // will Unmount
    return () => {
      dispatch(resetForm());
    };
    // eslint-disable-next-line
  }, [])

  useMemo(() => {
    async function loadRegistration() {
      if (id && formRegistration) {
        if (formRegistration.start_date) {
          await setStartDate(formatDateIso(formRegistration.start_date));
        }

        if (formRegistration.student) {
          await setNewStudent({
            label: formRegistration.student.name,
            value: formRegistration.student.id,
          });
        }

        if (formRegistration.plan) {
          await setNewPlan({
            label: formRegistration.plan.title,
            value: formRegistration.plan.id,
            duration: formRegistration.plan.duration,
            price: formRegistration.plan.price,
          });
        }

        if (formRegistration.plan && FormRegistration.student) {
          setRegistration(formRegistration);
        }
      }
    }

    loadRegistration();
  }, [formRegistration, id]); // eslint-disable-next-line

  const end_date = useMemo(() => {
    if (startDate && newPlan) {
      setTotal(formatCurrencyBR(newPlan.duration * newPlan.price));
      return format(addMonths(startDate, newPlan.duration), 'dd/MM/yyyy');
    }
    return '';
  }, [newPlan, startDate]);

  async function handleSubmit(data) {
    const registrationData = await {
      ...data,
      student_id: newStudent.value,
      plan_id: newPlan.value,
    };

    if (match.path === '/registration/edit/:id') {
      dispatch(
        registrationsSaveRequest({ id: match.params.id, ...registrationData })
      );
    } else {
      dispatch(registrationsSaveRequest(registrationData));
    }
  }

  return (
    <Container>
      <Header>
        <strong>Cadastro de Matricula</strong>
        <Controls>
          <Link to="/registration">
            <Button
              label="Voltar"
              icon={<MdArrowBack size={24} color="#fff" />}
              color="#CCCCCC"
            />
          </Link>
          <Button
            label="Salvar"
            icon={<MdDone size={24} color="#fff" />}
            type="submit"
            form="formRegistration"
          />
        </Controls>
      </Header>
      <Body>
        <Form
          id="formRegistration"
          schema={schema}
          onSubmit={handleSubmit}
          initialData={registration}
        >
          <Grid>
            <Row>
              <Column mobile="12" tablet="12" desktop="12">
                <StudentSelect
                  getChange={newStudent}
                  name="student_id"
                  label="ALUNO"
                  setChange={setNewStudent}
                />
              </Column>
            </Row>

            <Row>
              <Column mobile="12" tablet="3" desktop="3">
                <PlanSelect
                  name="plan_id"
                  label="PLANO"
                  setChange={setNewPlan}
                  getChange={newPlan}
                />
              </Column>
              <Column mobile="12" tablet="3" desktop="3">
                <DatePicker
                  label="DATA INICIO"
                  name="start_date"
                  getChange={startDate}
                  setChange={setStartDate}
                />
              </Column>
              <Column mobile="12" tablet="3" desktop="3">
                <ReadInput>
                  <strong>DATA TERMINO</strong>
                  <Input name="end_date" value={end_date || ''} disabled />{' '}
                </ReadInput>
              </Column>
              <Column mobile="12" tablet="3" desktop="3">
                <ReadInput>
                  <strong>VALOR FINAL</strong>
                  <Input name="total" value={total || 'R$ 0.00'} readOnly />
                </ReadInput>
              </Column>
            </Row>
          </Grid>
        </Form>
      </Body>
    </Container>
  );
}

FormRegistration.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
