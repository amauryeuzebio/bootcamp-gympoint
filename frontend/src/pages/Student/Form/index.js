import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  studentsSaveRequest,
  resetForm,
} from '~/store/modules/student/actions';

import Button from '~/components/Button';
import { Grid, Row, Column } from '~/components/Grid';

import { Container, Header, Body, Controls, CustomInput } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required('Informe seu nome completo'),
  email: Yup.string()
    .email()
    .required('Insira um e-mail válido'),
  age: Yup.number().required('Informe sua idade'),
  weight: Yup.number('Informe seu peso').required('Informe seu peso'),
  height: Yup.number('Informe seu peso').required('Informe sua altura'),
});

export default function FormStudent({ match }) {
  const student = useSelector(state => state.student.form);
  const dispatch = useDispatch();

  useEffect(() => {
    // will Unmount
    return () => {
      dispatch(resetForm());
    };
    // eslint-disable-next-line
  }, [])

  function handleSubmit(data) {
    if (match.path === '/student/edit/:id') {
      dispatch(studentsSaveRequest({ id: match.params.id, ...data }));
    } else {
      dispatch(studentsSaveRequest(data));
    }
  }

  return (
    <Container>
      <Header>
        <strong>Cadastro de Alunos</strong>
        <Controls>
          <Link to="/student">
            <Button label="Voltar" color="#CCCCCC" />
          </Link>
          <Button label="Salvar" type="submit" form="formStudent" />
        </Controls>
      </Header>
      <Body>
        <Form
          initialData={student}
          id="formStudent"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <Grid>
            <Row>
              <Column mobile="12" tablet="12" desktop="12">
                <CustomInput>
                  <strong>NOME COMPLETO</strong>
                  <Input name="name" placeholder="John Doe" />
                </CustomInput>
              </Column>
            </Row>
            <Row>
              <Column mobile="12" tablet="12" desktop="12">
                <CustomInput>
                  <strong>ENDEREÇO DE E-MAIL</strong>
                  <Input
                    name="email"
                    type="email"
                    placeholder="exemplo@email.com"
                  />
                </CustomInput>
              </Column>
            </Row>

            <Row>
              <Column mobile="12" tablet="4" desktop="4">
                <CustomInput>
                  <strong>IDADE</strong>
                  <Input name="age" />
                </CustomInput>
              </Column>
              <Column mobile="12" tablet="4" desktop="4">
                <CustomInput>
                  <strong>PESO (em kg)</strong>
                  <Input name="weight" />
                </CustomInput>
              </Column>
              <Column mobile="12" tablet="4" desktop="4">
                <CustomInput>
                  <strong>ALTURA</strong>
                  <Input name="height" />
                </CustomInput>
              </Column>
            </Row>
          </Grid>
        </Form>
      </Body>
    </Container>
  );
}

FormStudent.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
