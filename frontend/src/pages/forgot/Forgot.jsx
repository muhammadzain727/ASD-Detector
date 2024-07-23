import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
// import "../../components/base/base.css"
import "./forgot.css"
import Loader from '../../components/Loader';
const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false)
  const handleSubmit = async(e) => {

    e.preventDefault();
    setLoading(true)
    const response= await axios.post("http://127.0.0.1:8000/asd/send-reset-password-email/",{
        email
    })
    setLoading(false)
    setMessage(response.data.msg);
  };

  return (
    <div className='forgot-container'>
    <header>
    <img id="logo" src="/images/1__1_-removebg-preview.png" alt="Your Logo"/>
    </header>
    <div className='forgot-card'>
        {
            message && <div id='msg'>{message}</div>
        }
      <div className="form-group">
        <form onSubmit={handleSubmit} id='forgot-form'>
          <input
            type="hidden"
            name="csrfmiddlewaretoken"
            value={document.cookie.match(/csrftoken=([^;]*)/)?.[1]}
          />
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-custom btn-block" style={{display:"flex", justifyContent:"center",gap:"10px"}}>
           {loading&&<Loader/>} Submit</button>
        </form>
        <div id="link" className="text-center">
          <p id='login-btn'>Remembered your password? <Link to="/login" id='login-link'>Login</Link></p>
          <p id='signup-btn'>Don't have an account? <Link to="/signup" id='signup-link'>Sign Up</Link></p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ForgotPassword;
