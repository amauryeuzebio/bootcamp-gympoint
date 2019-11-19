import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import {
  answerRequest,
  answerSaveRequest,
  resetForm,
} from '~/store/modules/helpOrder/actions';

import { Table, Td, Th } from '~/components/Table';
import Pagination from '~/components/Pagination';
import Modal from '~/components/Modal';

import api from '~/services/api';

import { Container, Header, Body, Reply, ModalContainer } from './styles';

const schema = Yup.object().shape({
  answer: Yup.string().required('Reposta é obrigatorio!'),
});

export default function HelpOrder() {
  const helpOrder = useSelector(state => state.help.order);
  const awswerId = useSelector(state => state.help.awswerId);
  const modal = useSelector(state => state.help.modal);
  const dispatch = useDispatch();

  const [helps, setHelps] = useState([]);

  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageLimit, setPageLimit] = useState(20);
  const [pageNeighbours, setPageNeighbours] = useState(2);

  useEffect(() => {
    // will Unmount
    return () => {
      dispatch(resetForm());
    };
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    async function loadHelps() {
      const response = await api.get(`unansweredOrders?page=${page || 1}`);

      setHelps(response.data.orders);
      setTotalRecords(response.data.totalRecords);
      setPageLimit(response.data.pageLimit);
      setPageNeighbours(response.data.pageNeighbours);
    }

    loadHelps();
  }, [page]); // eslint-disable-line

  useMemo(() => {
    setHelps(helps.filter(h => h.id !== awswerId));
  }, [awswerId]); //eslint-disable-line

  function onPageChanged(data) {
    setPage(data.currentPage);
  }

  function showModal(id) {
    dispatch(answerRequest(id));
  }

  function handleSubmit(data) {
    const answer = {
      ...data,
      id: helpOrder.id,
    };

    dispatch(answerSaveRequest(answer));
  }

  return (
    <Container>
      <Header>
        <strong>Pedido de Auxilio</strong>
      </Header>

      <Body>
        <Table>
          <thead>
            <tr>
              <Th width="80%">ALUNO</Th>
              <Th width="20%" />
            </tr>
          </thead>
          <tbody>
            {helps.map(help => (
              <tr key={String(help.id)}>
                <Td>{help.student.name}</Td>
                <Td>
                  <Reply onClick={() => showModal(help.id)}>responder</Reply>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          totalRecords={Number(totalRecords)}
          pageLimit={Number(pageLimit)}
          pageNeighbours={Number(pageNeighbours)}
          onPageChanged={onPageChanged}
          currentPage={page}
        />
      </Body>

      {modal && (
        <ModalContainer>
          <Modal>
            <h1>PERGUNTA DO ALUNO</h1>
            {helpOrder && helpOrder.question ? (
              <p>{helpOrder.question}</p>
            ) : (
              <></>
            )}

            <h1>SUA RESPOSTA</h1>
            <Form schema={schema} onSubmit={handleSubmit}>
              <Input multiline name="answer" />

              <button type="submit">Responder aluno</button>
            </Form>
          </Modal>
        </ModalContainer>
      )}
    </Container>
  );
}
