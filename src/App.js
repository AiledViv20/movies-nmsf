import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Details from './pages/Details';
import ActorFilterProvider from './context';
import 'antd/dist/antd.css';

function App() {
  return (
    <ActorFilterProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/detail" component={Details} />
        </Switch>
      </Router>
    </ActorFilterProvider>
  );
}

export default App;
