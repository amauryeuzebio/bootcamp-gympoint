import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import {
  studentsGetRequest,
  studentsDeleteRequest,
} from '~/store/modules/student/actions';

import Search from '~/components/Search';
import Button from '~/components/Button';
import { Table, Td, Th } from '~/components/Table';
import Pagination from '~/components/Pagination';

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

export default function Student() {
  const dispatch = useDispatch();
  const [students, setStudents] = useState([]);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [totalRecords, setTotalRecords] = useState(0);
  const [pageLimit, setPageLimit] = useState(20);
  const [pageNeighbours, setPageNeighbours] = useState(2);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get(`students?q=${search}&page=${page || 1}`);

      setStudents(response.data.students);
      setTotalRecords(response.data.totalRecords);
      setPageLimit(response.data.pageLimit);
      setPageNeighbours(response.data.pageNeighbours);
    }

    loadStudents();
  }, [page, search]);

  function handleEdit(id) {
    dispatch(studentsGetRequest(id));
  }

  function handleDel(id) {
    dispatch(studentsDeleteRequest(id));
  }

  function onPageChanged(data) {
    setPage(data.currentPage);
  }

  return (
    <Container>
      <Header>
        <strong>Gerenciando Alunos</strong>

        <Controls>
          <Link to="/student/add">
            <Button label="Cadastrar" icon={<MdAdd size={24} />} />
          </Link>
          <Search setSearch={setSearch} />
        </Controls>
      </Header>

      <Body>
        <Table>
          <thead>
            <tr>
              <Th>NOME</Th>
              <Th>EMAIL</Th>
              <Th align="center">IDADE</Th>
              <Th />
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={String(student.id)}>
                <Td>{student.name}</Td>
                <Td>{student.email}</Td>
                <Td align="center">{student.age}</Td>
                <Td>
                  <Actions>
                    <Edit
                      to={`/student/edit/${student.id}`}
                      onClick={() => handleEdit(student.id)}
                    >
                      editar
                    </Edit>
                    <Del type="buttom" onClick={() => handleDel(student.id)}>
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
        />
      </Body>
    </Container>
  );
}
