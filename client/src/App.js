import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './App.css';

import Home from './screens/Home';
import Text from './screens/Text';
import Retell from './screens/Retell';

function App() {
  const history = useHistory()

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/viewText" exact>
            <Text history={history}/>
          </Route>
          <Route path="/retell" exact>
            <Retell history={history} />
          </Route>
          <Route path="/" exact>
            <Home history={history}/>
          </Route>
        </Switch>
        <Redirect to="/" />
      </Router>
    </div>
  );
}

export default App;
