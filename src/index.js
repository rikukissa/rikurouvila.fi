import './global.styl';

import React from 'react';
import { App } from './components/App';


if(typeof document !== 'undefined') {
  React.render(<App />, document.body);
}

export {App as default};
