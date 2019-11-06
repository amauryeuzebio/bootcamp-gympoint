import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Student from '~/pages/Student';
import Plan from '~/pages/Plan';
import Registration from '~/pages/Registration';
import HelpOrder from '~/pages/HelpOrder';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/student" component={Student} isPrivate />
      <Route path="/plan" component={Plan} isPrivate />
      <Route path="/registration" component={Registration} isPrivate />
      <Route path="/help" component={HelpOrder} isPrivate />
    </Switch>
  );
}
