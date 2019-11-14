import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import {
  plansGetRequest,
  plansDeleteRequest,
} from '~/store/modules/plan/actions';

import Search from '~/components/Search';
import Button from '~/components/Button';
import { Table, Td, Th } from '~/components/Table';
import Pagination from '~/components/Pagination';
import Alert from '~/util/alert';

import api from '~/services/api';

import {
  Container,
  Header,
  Controls,
  Body,
  Actions,
  Edit,
  Del,
} from './styles';

export default function Plan() {
  const dispatch = useDispatch();
  const deleteId = useSelector(state => state.plan.delete);
  const [plans, setPlan] = useState([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageLimit, setPageLimit] = useState(20);
  const [pageNeighbours, setPageNeighbours] = useState(2);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get(`plans?q=${search}&page=${page || 1}`);

      setPlan(response.data.students);
      setTotalRecords(response.data.totalRecords);
      setPageLimit(response.data.pageLimit);
      setPageNeighbours(response.data.pageNeighbours);
    }

    loadPlans();
  }, [page]); // eslint-disable-line

  useEffect(() => {
    setPage(1);
    async function loadPlans() {
      const response = await api.get(`plans?q=${search}&page=${1}`);

      setPlan(response.data.students);
      setTotalRecords(response.data.totalRecords);
      setPageLimit(response.data.pageLimit);
      setPageNeighbours(response.data.pageNeighbours);
    }

    loadPlans();
  }, [search]);

  useMemo(() => {
    setPlan(plans.filter(s => s.id !== deleteId));
  }, [deleteId]); // eslint-disable-line

  function handleEdit(id) {
    dispatch(plansGetRequest(id));
  }

  function handleDel(id, title) {
    Alert.delete(`Remover permanentemente ${title}?`).then(confirm => {
      if (confirm.value) {
        dispatch(plansDeleteRequest(id));
      }
    });
  }

  function onPageChanged(data) {
    setPage(data.currentPage);
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando Planos</strong>

        <Controls>
          <Link to="/plan/add">
            <Button label="Cadastrar" icon={<MdAdd size={24} />} />
          </Link>
          <Search setSearch={setSearch} />
        </Controls>
      </Header>

      <Body>
        <Table>
          <thead>
            <tr>
              <Th width="30%">TITULO</Th>
              <Th width="30%" align="center">
                DURAÇÃO
              </Th>
              <Th width="30%" align="center">
                VALOR p/ MÊS
              </Th>
              <Th width="10%" />
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={String(plan.id)}>
                <Td>{plan.title}</Td>
                <Td align="center">{plan.duration}</Td>
                <Td align="center">{plan.price}</Td>
                <Td>
                  <Actions>
                    <Edit
                      to={`/plan/edit/${plan.id}`}
                      onClick={() => handleEdit(plan.id)}
                    >
                      editar
                    </Edit>
                    <Del
                      type="buttom"
                      onClick={() => handleDel(plan.id, plan.title)}
                    >
                      apagar
                    </Del>
                  </Actions>
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
    </Container>
  );
}
