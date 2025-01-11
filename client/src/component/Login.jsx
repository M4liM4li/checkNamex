import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import style from '../style/Login.module.css';



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://check-namex-server.vercel.app/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (data.success) {
        sessionStorage.setItem('user', JSON.stringify(data.user));
        navigate('/Home');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    }
  };

  return (
    <div className={style.container}>
      <div className={style.sun}></div>
        <div className={style.cloud}>
            <div className={style.cloud}></div>
            <div className={style.cloud}></div>
            <div className={style.cloud}></div>
        </div>
        <div className={style.cloud}>
            <div className={style.cloud}></div>
            <div className={style.cloud}></div>
            <div className={style.cloud}></div>
        </div>
        <div className={style.cloud}>
            <div className={style.cloud}></div>
            <div className={style.cloud}></div>
            <div className={style.cloud}></div>
        </div>
        <div className={style.cloud}>
            <div className={style.cloud}></div>
            <div className={style.cloud}></div>
            <div className={style.cloud}></div>
        </div>
      <div className={style.content}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={style.input}>
            <input
              type="text"
              className={style.inputf}
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className={style.label}>Username</span>
          </div>
          <div className={style.input}>
            <input
              type="password"
              className={style.inputf}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className={style.label}>Password</span>
          </div>
          <button type="submit">Login</button>
        </form>
        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
