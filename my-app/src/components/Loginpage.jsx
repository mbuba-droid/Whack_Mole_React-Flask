/**
 * Login Component
 *
 * This React component handles user authentication for the Whack-a-Mole game.
 * It provides a login form where users can enter their character name and password
 * to access the game. The component also checks for existing login sessions and
 * allows navigation back to the home page.
 *
 * Key Features:
 * - Form validation for required fields
 * - Asynchronous login request to backend API
 * - Session persistence using browser's sessionStorage
 * - Conditional rendering based on login state
 * - Navigation between pages using React Router
 */

// Import React hooks for state management and side effects
import React, { useState, useEffect } from 'react';
// Import navigation hook from React Router for programmatic navigation
import { useNavigate } from 'react-router-dom';

/**
 * Login Functional Component
 *
 * Manages the login state and user interface for user authentication.
 * Uses React hooks to handle form inputs, API calls, and navigation.
 *
 * @returns {JSX.Element} The rendered login page component
 */
function Login() {
  // State for storing the character name input from the user
  const [characterName, setCharacterName] = useState('');
  // State for storing the password input from the user
  const [password, setPassword] = useState('');
  // State for storing the currently logged-in user data (if any)
  const [loggedInUser, setLoggedInUser] = useState(null);
  // Hook for programmatic navigation between routes
  const navigate = useNavigate();

  /**
   * useEffect Hook - Check for Existing Login Session
   *
   * Runs once when the component mounts to check if there's a previously
   * logged-in user stored in sessionStorage. If found, restores the user state.
   * This allows users to remain logged in across page refreshes.
   */
  useEffect(() => {
    // Retrieve stored user data from browser's session storage
    const storedUser = sessionStorage.getItem('loggedInUser');
    // If user data exists, parse it from JSON and update component state
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []); // Empty dependency array means this runs only once on mount

  /**
   * handleLogin Function - Process Login Form Submission
   *
   * Asynchronous function that handles the login form submission.
   * Validates input fields, sends login request to backend API,
   * and handles the response (success or failure).
   *
   * @param {Event} e - The form submission event
   */
  const handleLogin = async (e) => {
    // Prevent default form submission behavior (page reload)
    e.preventDefault();

    // Client-side validation: ensure both fields are filled
    if (!characterName || !password) {
      alert('Please enter both character name and password.');
      return; // Exit function if validation fails
    }

    try {
      // Send POST request to backend login endpoint
      const res = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST', // HTTP method for creating/sending data
        headers: {
          'Content-Type': 'application/json', // Specify JSON content type
        },
        // Convert form data to JSON string for request body
        body: JSON.stringify({
          name: characterName, // Map characterName to 'name' field expected by backend
          password: password, // Send password as-is
        }),
      });

      // Parse the JSON response from the server
      const data = await res.json();

      // Check if the response status indicates success (200-299 range)
      if (res.ok) {
        // Store user data in sessionStorage for persistence across sessions
        sessionStorage.setItem('loggedInUser', JSON.stringify(data));
        // Update component state with logged-in user data
        setLoggedInUser(data);
        // Show success message to user
        alert('Logged in successfully!');
        // Navigate to the game page after successful login
        navigate('/game');
      } else {
        // Handle login failure - show error message from server or default message
        alert(data.error || 'Invalid character name or password.');
      }
    } catch (err) {
      // Handle network errors or other exceptions during the request
      console.error(err); // Log error to browser console for debugging
      alert('Server error'); // Show generic error message to user
    }
  };

  /**
   * handleBack Function - Navigate Back to Home Page
   *
   * Simple function to navigate back to the home page when the back button is clicked.
   */
  const handleBack = () => {
    navigate('/'); // Navigate to root path (home page)
  };

  /**
   * Render Method - Return JSX for the Login Component
   *
   * Conditionally renders either a welcome message for logged-in users
   * or a login form for users who need to authenticate.
   */
  return (
    // Main container div with inline styles for centering and spacing
    <div style={styles.container}>
      {/* Page title */}
      <h2>Login Page</h2>

      {/* Conditional rendering based on login state */}
      {loggedInUser ? (
        // Render welcome message and navigation buttons if user is already logged in
        <div>
          {/* Personalized welcome message using user's name */}
          <p>Welcome back, {loggedInUser.name}!</p>
          {/* Button to go directly to the game */}
          <button style={styles.button} onClick={() => navigate('/game')}>
            Go to Game
          </button>
          {/* Button to go back to home page */}
          <button style={styles.button} onClick={handleBack}>
            Back
          </button>
        </div>
      ) : (
        // Render login form if user is not logged in
        <form onSubmit={handleLogin} style={styles.form}>
          {/* Input field for character name */}
          <input
            type="text" // Text input type
            placeholder="Character Name" // Placeholder text shown when field is empty
            value={characterName} // Controlled input bound to state
            onChange={(e) => setCharacterName(e.target.value)} // Update state on input change
            style={styles.input} // Apply custom styles
            required // HTML5 validation - field must be filled
          />

          {/* Input field for password */}
          <input
            type="password" // Password input type (hides entered text)
            placeholder="Password" // Placeholder text
            value={password} // Controlled input bound to state
            onChange={(e) => setPassword(e.target.value)} // Update state on input change
            style={styles.input} // Apply custom styles
            required // HTML5 validation - field must be filled
          />

          {/* Button group container for form actions */}
          <div style={styles.buttonGroup}>
            {/* Submit button to trigger login */}
            <button type="submit" style={styles.button}>
              Login
            </button>
            {/* Back button to return to home page */}
            <button type="button" style={styles.button} onClick={handleBack}>
              Back
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

/**
 * Styles Object - Inline CSS Styles for the Component
 *
 * Defines the visual styling for the login component using JavaScript objects.
 * These styles are applied inline to the JSX elements for consistent appearance.
 */
const styles = {
  // Container style for the main div - centers content and adds top padding
  container: {
    textAlign: 'center', // Center-align text and inline elements
    paddingTop: '100px', // Add space from top of viewport
  },

  // Form style - arranges form elements vertically with spacing
  form: {
    display: 'flex', // Use flexbox for layout
    flexDirection: 'column', // Stack elements vertically
    gap: '12px', // Space between form elements
    alignItems: 'center', // Center elements horizontally
  },

  // Input style - consistent appearance for text inputs
  input: {
    padding: '10px', // Internal spacing
    fontSize: '16px', // Readable font size
    width: '250px', // Fixed width for consistency
  },

  // Button group style - arranges buttons horizontally
  buttonGroup: {
    display: 'flex', // Use flexbox for button layout
    gap: '10px', // Space between buttons
    justifyContent: 'center', // Center buttons horizontally
  },

  // Button style - consistent appearance for all buttons
  button: {
    padding: '10px 20px', // Internal spacing (vertical, horizontal)
    fontSize: '16px', // Readable font size
    cursor: 'pointer', // Show pointer cursor on hover
  },
};

// Export the Login component as the default export for use in other files
export default Login;
