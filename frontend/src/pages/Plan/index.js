import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './List';
import Form from './Form';

export default function Plan() {
  return (
    <Switch>
      <Route path="/plan" exact component={List} isPrivate />
      <Route path="/plan/add" component={Form} isPrivate />
      <Route path="/plan/edit/:id" component={Form} isPrivate />
    </Switch>
  );
}
