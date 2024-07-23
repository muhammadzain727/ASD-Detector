import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./signup.css";
import Loader from '../../components/Loader';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isDoctor, setIsDoctor] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
       if(password.length < 8)
       {
          alert("Password should be min 8 character long");
          setLoading(false)
          return;
       }
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            setLoading(false)
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:8000/asd/register/', { 
                email, 
                name, 
                password, 
                password2: confirmPassword, 
                is_doctor: isDoctor 
            });

            if (response.status === 201) {
                navigate("/login"); // Redirect to home page after successful signup
            }
        } catch (error) {
            console.error('Signup failed:', error);
            setLoading(false)
            alert('Signup failed: ' + error.message); // Show an error message
        }
    };

    return (
        <div id='container' className='container_signup'>
            <div className="form-group_signup" style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                <form style={{ width: "35%" }} method="post" onSubmit={handleSubmit}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img id="logo" src="/images/1__1_-removebg-preview.png" alt="Your Logo" />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                name="confirm_password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div style={{ color: "white", marginTop: "10px" }}>
                        Doctor <input type="checkbox" checked={isDoctor} onChange={() => setIsDoctor(prev => !prev)} />
                    </div>
                    <button type="submit" className="btn btn-custom btn-block" style={{display:"flex", justifyContent:"center",gap:"10px",marginTop:"20px"}}>
                      {loading&&<Loader/>}  Sign Up</button>
                    <div id="link" className="text-center" style={{ marginTop: "10px" }}>
                        <p>Already have an account? <Link to="/login">Login</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
