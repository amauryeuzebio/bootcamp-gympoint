import React from 'react';
import { Switch } from 'react-router-dom';
import Route from '~/routes/Route';

import List from './List';
import Form from './Form';

export default function Student() {
  return (
    <Switch>
      <Route path="/student" component={List} isPrivate exact />
      <Route path="/student/add" component={Form} isPrivate />
    </Switch>
  );
}
