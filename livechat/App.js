import React, { Component } from 'react';

import Chat from './Components/Chat';
import Routes from './Components/Routes.js';

export default class App extends Component {
	render() {
		return (
      <Routes>
          <Chat />
      </Routes>
    )
	}
}