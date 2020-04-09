import React from 'react';
import { Router, Scene } from 'react-native-router-flux'
import Login from './Login';
import Chat from './Chat';

const Routes = () => (
    <Router>
       <Scene key = "root">
          <Scene key = "login" component = {Login} title = "Login" initial = {true} />
          <Scene key = "chat" component = {Chat} title = "Chat" />
       </Scene>
    </Router>
 )

 export default Routes
