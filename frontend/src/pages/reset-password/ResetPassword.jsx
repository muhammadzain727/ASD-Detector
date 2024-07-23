import axios from 'axios';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import "./style.css";
import Loader from '../../components/Loader';

const ResetPassword = () => {
    const { token, uid } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null);
    const [loading, setLoading] = useState(false);

    async function onSubmit() {
        if (password.length < 8) {
            setMessage("Password must be at least 8 characters long.");
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post(`http://127.0.0.1:8000/asd/reset-password/${uid}/${token}/`, {
                password,
                password2: confirmPassword
            });
            setLoading(false);
            setMessage(response.data.msg);
        } catch (error) {
            setLoading(false);
            setMessage("An error occurred while resetting the password.");
        }
    }
  return (
    <div className='container'>
        <header>
        <img id="logo" src="/images/1__1_-removebg-preview.png" alt="Your Logo"/>
        </header>
        <h1 id='heading'>Reset Password</h1>
        {
            message && <h2 id='msg'>{message}</h2>
        }
        <div className='inputs'>
       <input className='password' placeholder='Password' type='password' name='password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
       <input className='password' type='password' placeholder='Confirm Password' name='confirmPassword' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>
       <button onClick={onSubmit} id='submitBtn' style={{display:"flex", justifyContent:"center",gap:"10px"}}>
       {loading&&<Loader/>} Submit</button>
        </div>
    </div>
  )
}

export default ResetPassword