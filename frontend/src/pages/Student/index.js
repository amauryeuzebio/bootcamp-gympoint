import React from 'react';
import { Switch, Route } from 'react-router-dom';

import List from './List';
import Form from './Form';

export default function Student() {
  return (
    <Switch>
      <Route path="/student" exact component={List} isPrivate />
      <Route path="/student/add" component={Form} isPrivate />
      <Route path="/student/edit/:id" component={Form} isPrivate />
    </Switch>
  );
}
