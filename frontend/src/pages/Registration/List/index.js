import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import {
  registrationsGetRequest,
  registrationsDeleteRequest,
} from '~/store/modules/registration/actions';

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

export default function Registration() {
  const dispatch = useDispatch();
  const deleteId = useSelector(state => state.registration.delete);
  const [registrations, setRegistration] = useState([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageLimit, setPageLimit] = useState(20);
  const [pageNeighbours, setPageNeighbours] = useState(2);

  useEffect(() => {
    async function loadRegistrations() {
      const response = await api.get(
        `registrations?q=${search}&page=${page || 1}`
      );

      setRegistration(response.data.registration);
      setTotalRecords(response.data.totalRecords);
      setPageLimit(response.data.pageLimit);
      setPageNeighbours(response.data.pageNeighbours);
    }

    loadRegistrations();
  }, [page]); // eslint-disable-line

  useEffect(() => {
    setPage(1);
    async function loadRegistrations() {
      const response = await api.get(`registrations?q=${search}&page=${1}`);

      setRegistration(response.data.registration);
      setTotalRecords(response.data.totalRecords);
      setPageLimit(response.data.pageLimit);
      setPageNeighbours(response.data.pageNeighbours);
    }

    loadRegistrations();
  }, [search]);

  useMemo(() => {
    setRegistration(registrations.filter(s => s.id !== deleteId));
  }, [deleteId]); // eslint-disable-line

  function handleEdit(id) {
    dispatch(registrationsGetRequest(id));
  }

  function handleDel(id, registration) {
    Alert.delete(
      `Remover permanentemente a matricula de ${registration.name} no plano ${registration.plan}?`
    ).then(confirm => {
      if (confirm.value) {
        dispatch(registrationsDeleteRequest(id));
      }
    });
  }

  function onPageChanged(data) {
    setPage(data.currentPage);
  }

  function dateFormatted(date) {
    return format(parseISO(date), "d 'de' MMMM 'de' yyyy", { locale: pt });
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando Matriculas</strong>

        <Controls>
          <Link to="/registration/add">
            <Button label="Cadastrar" icon={<MdAdd size={24} />} />
          </Link>
          <Search setSearch={setSearch} />
        </Controls>
      </Header>

      <Body>
        <Table>
          <thead>
            <tr>
              <Th width="20%">ALUNO</Th>
              <Th width="20%" align="center">
                PLANO
              </Th>
              <Th width="20%" align="center">
                INICIO
              </Th>
              <Th width="20%" align="center">
                TERMINO
              </Th>
              <Th width="20%" align="center">
                ATIVA
              </Th>
              <Th width="10%" />
            </tr>
          </thead>
          <tbody>
            {registrations.map(registration => (
              <tr key={String(registration.id)}>
                <Td>{registration.student.name}</Td>
                <Td align="center">{registration.plan.title}</Td>
                <Td align="center">{dateFormatted(registration.start_date)}</Td>
                <Td align="center">{dateFormatted(registration.end_date)}</Td>
                <Td align="center">{registration.active ? 'SIM' : 'NÃO'}</Td>
                <Td>
                  <Actions>
                    <Edit
                      to={`/registration/edit/${registration.id}`}
                      onClick={() => handleEdit(registration.id)}
                    >
                      editar
                    </Edit>
                    <Del
                      type="buttom"
                      onClick={() =>
                        handleDel(registration.id, {
                          plan: registration.plan.title,
                          name: registration.student.name,
                        })
                      }
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
