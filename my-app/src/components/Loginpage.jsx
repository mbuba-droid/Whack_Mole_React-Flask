/* Import React hooks and dependencies */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

/* Main Login component */
function Login() {
  /* State for character name input */
  const [characterName, setCharacterName] = useState('');
  /* State for password input */
  const [password, setPassword] = useState('');
  /* State for logged-in user */
  const [loggedInUser, setLoggedInUser] = useState(null);
  /* React Router navigation hook */
  const navigate = useNavigate();

  /* On mount, check if user is already logged in */
  useEffect(() => {
    const storedUser = localStorage.getItem('loggedInUser');
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  /* Handle login form submission */
  const handleLogin = (e) => {
    e.preventDefault();
    /* Validate inputs */
    if (!characterName || !password) {
      alert('Please enter both character name and password.');
      return;
    }
    /* Check stored user credentials */
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      alert('No registered user found. Please register first.');
      return;
    }
    const user = JSON.parse(storedUser);
    /* Validate credentials */
    if (user.name === characterName && user.password === password) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      setLoggedInUser(user);
      alert('Logged in successfully!');
      navigate('/game');
    } else {
      alert('Invalid character name or password.');
    }
  };

  /* Handle back button click */
  const handleBack = () => {
    navigate('/');
  };

  /* Render login form or welcome message if already logged in */
  return (
    <div style={styles.container}>
      <h2>Login Page</h2>
      {loggedInUser ? (
        <div>
          <p>Welcome back, {loggedInUser.name}!</p>
          <button style={styles.button} onClick={() => navigate('/game')}>Go to Game</button>
          <button style={styles.button} onClick={handleBack}>Back</button>
        </div>
      ) : (
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="text"
            placeholder="Character Name"
            value={characterName}
            onChange={(e) => setCharacterName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            required
          />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.button}>Login</button>
            <button type="button" style={styles.button} onClick={handleBack}>Back</button>
          </div>
        </form>
      )}
    </div>
  );
}

/* Inline styles for the component */
const styles = {
  container: {
    textAlign: 'center',
    paddingTop: '100px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    width: '250px',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

/* Export the Login component */
export default Login;
