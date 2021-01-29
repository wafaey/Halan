import React from 'react';
import routes from './Routes/routes';
import {BrowserRouter as Router , Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
     <Router>
     <div className="Main-page">
      <Switch>
        {
          routes.map((route, k) => {
            return <Route path={route.path} exact={route.exact} component={route.component} key={route.name}
            />
          })
        }
      </Switch>
      </div>
     </Router>
    </div>
  );
}

export default App;
