import React from 'react';
import { Routes, Route } from 'react-router-dom';
import config from './config.json';
import Signup from './pages/signup';
import Signin from './pages/signin';
import home from './pages/home.jsx';
import Nav from './pages/nav.jsx';
import Gamble from './pages/gamble.jsx';

function App() {
  const [data, setData] = React.useState({});
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${config.Backend.url}/auth/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token
        })
      }).then(res => res.json()).then(data => {
        if (data.status !== 200) {
          localStorage.removeItem('token');
          return;
        } else {
          setData(data.load.user);
        }
      })
    }
  }, [token]);

  const setbalance = (balance) => {
    setData({
      ...data,
      balance
    })
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <Nav data={data} />
      <Routes>
        <Route path="/" />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/gamble' element={<Gamble balance={data.balance} setBalance={setbalance} setToken={setToken} />} />
      </Routes>
    </div>
  );
}

export default App;
