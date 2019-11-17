import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { plansSaveRequest, resetForm } from '~/store/modules/plan/actions';

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
  title: Yup.string().required(),
  duration: Yup.number().required(),
  price: Yup.number().required(),
});

export default function FormPlan({ match }) {
  const plan = useSelector(state => state.plan.form);
  const dispatch = useDispatch();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState(0);

  useEffect(() => {
    // will Unmount
    return () => {
      dispatch(resetForm());
    };
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setDuration(plan.duration);
    setPrice(plan.price);
  }, [plan.duration, plan.price]);

  function handleSubmit(data) {
    if (match.path === '/plan/edit/:id') {
      dispatch(plansSaveRequest({ id: match.params.id, ...data }));
    } else {
      dispatch(plansSaveRequest(data));
    }
  }

  return (
    <Container>
      <Header>
        <strong>Cadastro de Plano</strong>
        <Controls>
          <Link to="/plan">
            <Button label="Voltar" color="#CCCCCC" />
          </Link>
          <Button label="Salvar" type="submit" form="formPlan" />
        </Controls>
      </Header>
      <Body>
        <Form
          initialData={plan}
          id="formPlan"
          schema={schema}
          onSubmit={handleSubmit}
        >
          <Grid>
            <Row>
              <Column mobile="12" tablet="12" desktop="12">
                <CustomInput>
                  <strong>TITULO DO PLANO</strong>
                  <Input name="title" />
                </CustomInput>
              </Column>
            </Row>

            <Row>
              <Column mobile="12" tablet="4" desktop="4">
                <CustomInput>
                  <strong>DURAÇÃO (em meses)</strong>
                  <Input
                    name="duration"
                    onChange={e => setDuration(e.target.value)}
                  />
                </CustomInput>
              </Column>
              <Column mobile="12" tablet="4" desktop="4">
                <CustomInput>
                  <strong>PREÇO MENSAL</strong>
                  <Input
                    name="price"
                    onChange={e => setPrice(e.target.value)}
                  />
                </CustomInput>
              </Column>
              <Column mobile="12" tablet="4" desktop="4">
                <ReadInput>
                  <strong>PREÇO TOTAL</strong>
                  <Input name="total" readOnly value={duration * price || 0} />
                </ReadInput>
              </Column>
            </Row>
          </Grid>
        </Form>
      </Body>
    </Container>
  );
}

FormPlan.propTypes = {
  match: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};
