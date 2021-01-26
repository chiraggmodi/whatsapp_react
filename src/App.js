import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import Sidebar from "./Sidebar";
import Chat from "./Chat"
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }] = useStateValue();

  return (
    <div className="App">
      {!user ? (
        <Login />
      ) : (
          <div className="app__body">
            <Router>
              <Sidebar />
              <Switch>

                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>

                <Route path="/" exact>
                  <Chat />
                </Route>

              </Switch>
            </Router>



          </div>
        )}

    </div>
  );
}

export default App;
