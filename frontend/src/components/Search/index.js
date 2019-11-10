import React from 'react';
import PropTypes from 'prop-types';
import { MdSearch } from 'react-icons/md';
import { Container, Search } from './styles';

export default function InputSearch({ setSearch }) {
  return (
    <Container>
      <MdSearch size={24} />
      <Search
        onKeyPress={e => (e.key === 'Enter' ? setSearch(e.target.value) : '')}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  setSearch: PropTypes.func.isRequired,
};
