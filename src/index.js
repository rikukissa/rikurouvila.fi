import './global.styl';

import React from 'react';
import { render } from 'react-dom';

import App from './components/App';

if(typeof document !== 'undefined') {
  render(<App />, document.getElementById('root'));
}

export {App as default};
