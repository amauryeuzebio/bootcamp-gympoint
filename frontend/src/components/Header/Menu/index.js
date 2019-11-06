import React from 'react';

import { Container, MenuList, MenuItem, MenuLink } from './styles';

import links from './content';

export default function Menu() {
  return (
    <Container>
      <MenuList>
        {links.map(link => (
          <MenuItem key={link}>
            <MenuLink to={link.url} activeStyle={{ color: '#444444' }}>
              {link.label}
            </MenuLink>
          </MenuItem>
        ))}
      </MenuList>
    </Container>
  );
}
