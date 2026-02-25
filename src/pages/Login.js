import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Login.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockTimer, setLockTimer] = useState(0);

  // Load remembered email
  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  // Lockout timer
  useEffect(() => {
    if (lockTimer > 0) {
      const timer = setTimeout(() => setLockTimer(lockTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else if (lockTimer === 0 && isLocked) {
      setIsLocked(false);
      setAttempts(0);
    }
  }, [lockTimer, isLocked]);

  // Calculate password strength
  const calculatePasswordStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (pwd.length >= 12) strength++;
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
    if (/\d/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    setPasswordStrength(strength);
  };

  const handlePasswordChange = (e) => {
    const pwd = e.target.value;
    setPassword(pwd);
    calculatePasswordStrength(pwd);
  };

  const getPasswordStrengthLabel = () => {
    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return labels[passwordStrength] || 'Very Weak';
  };

  const getPasswordStrengthColor = () => {
    const colors = ['#EF4444', '#F97316', '#EAB308', '#84CC16', '#22C55E', '#16A34A'];
    return colors[passwordStrength] || '#EF4444';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check if account is locked
    if (isLocked) {
      setError(`Too many failed attempts. Please try again in ${lockTimer} seconds.`);
      return;
    }

    // Validate inputs
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });

      const { token, user } = response.data;

      // Save remembered email
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      // Reset attempts on successful login
      setAttempts(0);
      onLogin(user, token);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Login failed. Please try again.';
      setError(errorMsg);

      // Brute force protection
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);

      if (newAttempts >= 5) {
        setIsLocked(true);
        setLockTimer(300); // 5 minutes lockout
        setError('Too many failed attempts. Account locked for 5 minutes.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setForgotSuccess('');

    if (!forgotEmail) {
      setError('Please enter your email address.');
      return;
    }

    setForgotLoading(true);

    try {
      await axios.post(`${API_URL}/auth/forgot-password`, {
        email: forgotEmail
      });

      setForgotSuccess('Password reset link sent to your email. Please check your inbox.');
      setForgotEmail('');
      setTimeout(() => setShowForgotPassword(false), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset link.');
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* Logo & Branding */}
        <div className="login-header">
          <div className="login-logo">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h1>SQUADGOO</h1>
          <p className="login-tagline">Admin Panel</p>
          <p className="login-subtitle">Internal Staff & Admins Only</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-error">
            <i className="fas fa-exclamation-circle"></i>
            <span>{error}</span>
          </div>
        )}

        {/* Success Alert */}
        {forgotSuccess && (
          <div className="alert alert-success">
            <i className="fas fa-check-circle"></i>
            <span>{forgotSuccess}</span>
          </div>
        )}

        {/* Forgot Password Form */}
        {showForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="login-form">
            <h3>Reset Password</h3>
            <p className="form-description">Enter your email and we'll send you a reset link.</p>

            <div className="form-group">
              <label htmlFor="forgot-email">Email Address</label>
              <input
                type="email"
                id="forgot-email"
                placeholder="admin@squadgoo.com.au"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                required
                disabled={forgotLoading}
              />
            </div>

            <button type="submit" className="login-button" disabled={forgotLoading}>
              {forgotLoading ? (
                <>
                  <span className="spinner-small"></span>
                  Sending...
                </>
              ) : (
                <>
                  <i className="fas fa-envelope"></i>
                  Send Reset Link
                </>
              )}
            </button>

            <button
              type="button"
              className="link-button"
              onClick={() => setShowForgotPassword(false)}
            >
              Back to Login
            </button>
          </form>
        ) : (
          /* Login Form */
          <form onSubmit={handleSubmit} className="login-form">
            {/* Email Input */}
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <div className="input-wrapper">
                <i className="fas fa-envelope"></i>
                <input
                  type="email"
                  id="email"
                  placeholder="admin@squadgoo.com.au"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading || isLocked}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <i className="fas fa-lock"></i>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                  disabled={loading || isLocked}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || isLocked}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  <i className={`fas fa-eye${showPassword ? '' : '-slash'}`}></i>
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div
                      className="strength-fill"
                      style={{
                        width: `${(passwordStrength / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor()
                      }}
                    ></div>
                  </div>
                  <span
                    className="strength-label"
                    style={{ color: getPasswordStrengthColor() }}
                  >
                    {getPasswordStrengthLabel()}
                  </span>
                </div>
              )}

              {/* Password Requirements */}
              {password && (
                <div className="password-requirements">
                  <p className="requirements-title">Password Requirements:</p>
                  <ul>
                    <li className={password.length >= 8 ? 'met' : ''}>
                      <i className={`fas fa-${password.length >= 8 ? 'check' : 'times'}`}></i>
                      At least 8 characters
                    </li>
                    <li className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'met' : ''}>
                      <i className={`fas fa-${/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'check' : 'times'}`}></i>
                      Mix of uppercase and lowercase
                    </li>
                    <li className={/\d/.test(password) ? 'met' : ''}>
                      <i className={`fas fa-${/\d/.test(password) ? 'check' : 'times'}`}></i>
                      At least one number
                    </li>
                    <li className={/[!@#$%^&*]/.test(password) ? 'met' : ''}>
                      <i className={`fas fa-${/[!@#$%^&*]/.test(password) ? 'check' : 'times'}`}></i>
                      At least one special character (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="login-options">
              <label className="checkbox">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading || isLocked}
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                className="link-button"
                onClick={() => setShowForgotPassword(true)}
                disabled={loading || isLocked}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-button"
              disabled={loading || isLocked}
            >
              {loading ? (
                <>
                  <span className="spinner-small"></span>
                  Logging in...
                </>
              ) : isLocked ? (
                <>
                  <i className="fas fa-lock"></i>
                  Locked ({lockTimer}s)
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt"></i>
                  Login
                </>
              )}
            </button>

            {/* Attempts Warning */}
            {attempts > 0 && attempts < 5 && (
              <p className="attempts-warning">
                <i className="fas fa-exclamation-triangle"></i>
                {5 - attempts} attempt{5 - attempts !== 1 ? 's' : ''} remaining before lockout
              </p>
            )}
          </form>
        )}

        {/* Footer */}
        <div className="login-footer">
          <p>&copy; 2026 SQUADGOO Pty Ltd</p>
          <p>ABN: 43 670 318 715 | Melbourne, Australia</p>
          <p className="security-note">
            <i className="fas fa-shield-alt"></i>
            Secure Login • Encrypted Connection
          </p>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="login-background">
        <div className="gradient-blob blob-1"></div>
        <div className="gradient-blob blob-2"></div>
        <div className="gradient-blob blob-3"></div>
      </div>
    </div>
  );
}

export default Login;
