import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import SignIn from '~/pages/SignIn';
import Checkin from '~/pages/Checkin';
import HelpOrder from '~/pages/HelpOrder';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    Checkin,
    HelpOrder,
  })
);
