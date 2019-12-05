import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdDone, MdArrowBack } from 'react-icons/md';

import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { plansSaveRequest, resetForm } from '~/store/modules/plan/actions';

import Button from '~/components/Button';
import { Grid, Row, Column } from '~/components/Grid';
import CurrencyInput from '~/components/CurrencyInput';

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
  const { id } = useParams();
  const formPlan = useSelector(state => state.plan.form);

  const dispatch = useDispatch();
  const [plan, setPlan] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState();

  useEffect(() => {
    // will Unmount
    return () => {
      dispatch(resetForm());
    };
    // eslint-disable-next-line
  }, [])

  useMemo(() => {
    async function loadPlan() {
      if (id && formPlan && formPlan.price) {
        setDuration(formPlan.duration);
        setPrice(formPlan.price);
        await setPlan(formPlan);
      }
    }
    loadPlan();
  }, [formPlan, id]);

  useEffect(() => {
    if (plan && plan.duration) {
      setDuration(plan.duration);
    }

    if (plan && plan.price) {
      setPrice(plan.price);
    }
  }, [plan]);

  useMemo(() => {
    const newTotalPrice = price * duration;
    setTotalPrice(newTotalPrice);
  }, [price, duration]); //eslint-disable-line

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
            form="formPlan"
          />
        </Controls>
      </Header>
      <Body>
        <Form
          id="formPlan"
          schema={schema}
          onSubmit={handleSubmit}
          initialData={plan}
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
                    type="number"
                    onChange={e => setDuration(e.target.value)}
                  />
                </CustomInput>
              </Column>
              <Column mobile="12" tablet="4" desktop="4">
                <CustomInput>
                  <strong>PREÇO MENSAL</strong>
                  <CurrencyInput
                    name="price"
                    getChange={price}
                    setChange={setPrice}
                  />
                </CustomInput>
              </Column>
              <Column mobile="12" tablet="4" desktop="4">
                <ReadInput>
                  <strong>PREÇO TOTAL</strong>
                  <CurrencyInput
                    disabled
                    name="totalPrice"
                    getChange={totalPrice}
                  />
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
