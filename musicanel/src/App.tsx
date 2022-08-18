import React, {useContext} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Library from "./pages/Library";
import AuthContext from "./store/auth-context";

function App() {
    const {isLoggedIn} = useContext(AuthContext)

    return (
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              {isLoggedIn &&
                  <Route path="/library" element={<Library />} />
              }
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
    );
}

export default App;
