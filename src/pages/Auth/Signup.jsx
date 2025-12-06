
// src/pages/Auth/Signup.jsx
import { useState } from 'react';
import { signUpWithEmail, signInWithGoogle } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      await signUpWithEmail(email, password);
      navigate('/student/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleEmailSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>

      <hr />
      <button onClick={handleGoogleSignup}>
        <img src="/logo.png" alt="Google" width={20} /> Sign up with Google
      </button>
    </div>
  );
};

export default Signup;
