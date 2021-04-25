import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post('/api/login', {
        email,
        password,
      });
      console.log('register response', response);
    } catch (err) {
      console.log('failed to register user', err);
    }
  };
  return (
    <div>
      <form onSubmit={onSubmit} style={{ padding: '2rem' }}>
        <h1>Login</h1>
        <p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="email"
          />
        </p>
        <p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="password"
          />
        </p>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};

export default Login;
