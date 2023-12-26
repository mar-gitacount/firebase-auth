import { VFC } from 'react';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import HomePage from './pages/HomePage';
import PublicPage from './pages/PublicPage';
import PrivatePage from './pages/PrivatePage';
// import LoginPage from './pages/LoginPage';
import './App.css';
import SignIn from 'pages/SignIn';

const App: VFC = () => {
  return (
    // <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/public" component={PublicPage} />
          {/* <Route
            path="/private"
            render={() => (
              <RequireAuth>
                <PrivatePage />
              </RequireAuth>
            )}
          /> */}
          <Route path="/signin" component={SignIn} />
        </Switch>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
    // </BrowserRouter>
  );
};

export default App;
