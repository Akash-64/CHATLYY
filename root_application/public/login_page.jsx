import React, { useState, useEffect } from 'react';
import './login_style.css';

const LoginPage = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSlide = (isLogin) => {
    setIsLoginActive(isLogin);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login Data:', formData);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log('Signup Data:', formData);
  };

  return (
    <div className="container">
      <div className="image">
        <img src="chatlyy.jpg" alt="Logo" />
      </div>
      
      <div className="wrapper">
        <div className="title-text">
          <div className="title login">
            Chatlyy Account 
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input 
              type="radio" 
              name="slide" 
              id="login" 
              checked={isLoginActive}
              onChange={() => handleSlide(true)}
            />
            <input 
              type="radio" 
              name="slide" 
              id="signup" 
              checked={!isLoginActive}
              onChange={() => handleSlide(false)}
            />
            <label 
              htmlFor="login" 
              className="slide login"
              onClick={() => handleSlide(true)}
            >
              Login
            </label>
            <label 
              htmlFor="signup" 
              className="slide signup"
              onClick={() => handleSlide(false)}
            >
              SignUp
            </label>
            <div 
              className="slider-tab" 
              style={{ left: isLoginActive ? '0%' : '50%' }}
            ></div>
          </div>
          
          <div className="form-inner">
            <form onSubmit={handleLoginSubmit} className="login" style={{ display: isLoginActive ? 'block' : 'none' }}>
              <div className="field">
                <input 
                  type="text" 
                  placeholder="Email Address" 
                  required 
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <input 
                  type="password" 
                  placeholder="Password" 
                  required 
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="pass-link">
                <a href="#">Reset password?</a>
              </div>
              <div className="field btn">
                <div className="btn-layer"></div>
                <input type="submit" value="Login" />
              </div>
              <div className="signup-link">
                Don't Have Account? <a href="#" onClick={() => handleSlide(false)}>Create One!</a>
              </div>
            </form>

            <form onSubmit={handleSignupSubmit} className="signup" style={{ display: !isLoginActive ? 'block' : 'none' }}>
              <div className="field">
                <input 
                  type="text" 
                  placeholder="Email Address" 
                  required 
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <input 
                  type="password" 
                  placeholder="Password" 
                  required 
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field">
                <input 
                  type="password" 
                  placeholder="Confirm Password" 
                  required 
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
              </div>
              <div className="field btn">
                <input type="submit" value="SignUp" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
