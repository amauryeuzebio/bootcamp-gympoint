import React from 'react';

import Menu from './Menu';

import logo from '~/assets/logo2.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="GymPoint" />

          <Menu />
        </div>

        <aside>
          <Profile>
            <div>
              <strong>Amaury Euzebio</strong>
            </div>
            <button type="button">Sair do Sistema</button>{' '}
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
