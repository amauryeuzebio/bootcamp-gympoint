import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import Search from '~/components/Search';
import Button from '~/components/Button';
import { Table, Td, Th } from '~/components/Table';

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
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  return (
    <Container>
      <Header>
        <strong>Gerenciando Alunos</strong>

        <Controls>
          <Link to="/student/add">
            <Button label="Cadastrar" icon={<MdAdd size={24} />} />
          </Link>
          <Search />
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
                    <Edit>editar</Edit>
                    <Del>apagar</Del>
                  </Actions>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Body>
    </Container>
  );
}
