import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './List';
import Form from './Form';

export default function Plan() {
  return (
    <Switch>
      <Route path="/registration" exact component={List} isPrivate />
      <Route path="/registration/add" component={Form} isPrivate />
      <Route path="/registration/edit/:id" component={Form} isPrivate />
    </Switch>
  );
}
