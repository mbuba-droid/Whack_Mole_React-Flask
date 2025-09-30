import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    alert('Registration successful!');
    navigate('/login');
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Create Your Character</h2>
      <input
        placeholder="Character Name"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Password"
        type="password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Register</button>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    width: '300px',
    margin: '100px auto',
    textAlign: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default Register;