import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import Menu from './Menu';

import logo from '~/assets/logo2.svg';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const dispatch = useDispatch();
  const profile = useSelector(state => state.user.profile);

  function handleSignOut() {
    dispatch(signOut());
  }

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
              <strong>{profile.name}</strong>
            </div>
            <button type="button" onClick={handleSignOut}>
              Sair do Sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
