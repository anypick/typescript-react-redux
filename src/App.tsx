import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { IRouter } from './router';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IRouter />
    </Provider>
  );
}

export default App;
