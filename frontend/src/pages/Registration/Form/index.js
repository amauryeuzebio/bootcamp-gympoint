import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  registrationsSaveRequest,
  resetForm,
} from '~/store/modules/registration/actions';

import Button from '~/components/Button';
import { Grid, Row, Column } from '~/components/Grid';

import {
  Container,
  Header,
  Body,
  Controls,
  CustomInput,
  ReadInput,
} from './styles';

const schema = Yup.object().shape({
  student_id: Yup.number().required(),
  plan_id: Yup.number().required(),
  start_date: Yup.date().required(),
});

export default function FormRegistration({ match }) {
  const registration = useSelector(state => state.registration.form);
  const dispatch = useDispatch();

  useEffect(() => {
    // will Unmount
    return () => {
      dispatch(resetForm());
    };
    // eslint-disable-next-line
  }, [])

  function handleSubmit(data) {
    if (match.path === '/registration/edit/:id') {
      dispatch(registrationsSaveRequest({ id: match.params.id, ...data }));
    } else {
      dispatch(registrationsSaveRequest(data));
    }
  }

  return (
    <Container>
      <Header>
        <strong>Cadastro de Matricula</strong>
        <Controls>
          <Link to="/registration">
            <Button label="Voltar" color="#CCCCCC" />
          </Link>
          <Button label="Salvar" type="submit" form="formRegistration" />
        </Controls>
      </Header>
      <Body>
        <Form
          initialData={registration}
          id="formRegistration"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <Grid>
            <Row>
              <Column mobile="12" tablet="12" desktop="12">
                <CustomInput>
                  <strong>ALUNO</strong>
                  <Input name="studant_id" placeholder="Buscar Aluno" />
                </CustomInput>
              </Column>
            </Row>

            <Row>
              <Column mobile="12" tablet="3" desktop="3">
                <CustomInput>
                  <strong>PLANO</strong>
                  <Input name="aplan_id" placeholder="Selecione o Plano" />
                </CustomInput>
              </Column>
              <Column mobile="12" tablet="3" desktop="3">
                <CustomInput>
                  <strong>DATA INICIO</strong>
                  <Input name="start_date" placeholder="Escolha a data" />
                </CustomInput>
              </Column>
              <Column mobile="12" tablet="3" desktop="3">
                <ReadInput>
                  <strong>DATA TERMINO</strong>
                  <Input name="end_date" readOnly />
                </ReadInput>
              </Column>
              <Column mobile="12" tablet="3" desktop="3">
                <ReadInput>
                  <strong>VALOR FINAL</strong>
                  <Input name="total" readOnly />
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
