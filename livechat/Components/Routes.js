import React from 'react';
import { Router, Scene } from 'react-native-router-flux'
import Login from './Login';
import Chat from './ClientChat';
import Admin from './AdminChat';

const Routes = () => (
    <Router>
       <Scene key = "root">
          <Scene key = "login" component = {Login} title = "Login" initial = {true} />
          <Scene key = "chat" component = {Chat} title = "Client Chat" />
          <Scene key = "admin" component = {Admin} title = "Admin Panel" />
       </Scene>
    </Router>
 )

 export default Routes
