import React from 'react';
import PropsTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { Container, Search } from './styles';

export default function InputSearch() {
  return (
    <Container>
      <MdSearch size={24} />
      <Search />
    </Container>
  );
}

InputSearch.PropsTypes = {
  handleSearch: PropsTypes.func.isRequired,
};
