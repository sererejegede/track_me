import React, { useReducer } from 'react';

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext();

  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue);

    const boundActions = {};
    Object.keys(actions).forEach(action => {
      boundActions[action] = actions[action](dispatch)
    })
    // for (const key in actions) {
    //   boundActions[key] = actions[key](dispatch);
    // }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};
