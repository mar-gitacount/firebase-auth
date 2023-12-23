import { VFC } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import HomePage from './pages/HomePage';
import PublicPage from './pages/PublicPage';
import PrivatePage from './pages/PrivatePage';
import LoginPage from './pages/LoginPage';
import './App.css';
import SignIn from 'pages/SignIn';

const App: VFC = () => {
  return (
    // <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/public" element={<PublicPage />} />
          <Route
            path="/private"
            element={
              <RequireAuth>
                <PrivatePage />
              </RequireAuth>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
        <div>
          <NavLink to="/">Home</NavLink>
        </div>
      </div>
    /* </BrowserRouter> */
  );
};

export default App;
