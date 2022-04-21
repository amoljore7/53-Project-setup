import React from 'react';
import { createMemoryHistory } from 'history';
import { Router, Route } from 'react-router-dom';
import { render } from '@testing-library/react';

const testUtils = () => {
  /* NOTE: Used to create a fake store for the UT cases to render */
  const storeFake = (state) => ({
    default: () => {},
    subscribe: () => {},
    dispatch: () => {},
    getState: () => ({ ...state }),
  });

  /* NOTE: Used to create a fake router for the UT cases to render */
  const renderWithRouter = (
    ui,
    { route = '/', history = createMemoryHistory({ initialEntries: [route] }) } = {}
  ) => {
    return {
      ...render(
        <Router history={history}>
          <Route path={route}>{ui}</Route>
        </Router>
      ),
      history,
    };
  };

  return {
    storeFake: (state) => {
      return storeFake(state);
    },
    renderWithRouter: (ui, { route, history }) => {
      return renderWithRouter(ui, { route, history });
    },
  };
};

export default testUtils();
