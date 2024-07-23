import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./login.css"
import Loader from '../../components/Loader';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/asd/login/', { email, password });
            if (response.status === 200) {
                // Redirect to home page or another page after successful login
                console.log(response.data)
                document.cookie=`access_token=${response.data.token.access}`
                navigate("/")
                window.location.reload()
            }
        } catch (error) {
            alert("Wrong Password or email");
            // console.error('Login failed:', error);
            setLoading(false)
            // Handle login failure (e.g., show an error message)
        }
    };

    return (
        <>
     
    <div id='container' className='container_login'>
    <div className="form-group_login" >
            <form style={{width:"35%"}} method="post" onSubmit={handleSubmit}>
            <div  style={{width:"100%", display:'flex', justifyContent:'center' }}><img  id="logo" src="/images/1__1_-removebg-preview.png" alt="Your Logo"/></div>  

            <div style={{ display:"flex" , flexDirection:"column",gap:"12px"}}>         
                <div className="form-group_login">
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
        <div style={{alignSelf:"center",width:"35%",}}>
           
                <button type="submit" className="btn btn-custom btn-block" style={{display:"flex", justifyContent:"center",gap:"10px"}}> 
                   {loading&&<Loader/>} Login</button>
            <div id="link" className="text-center">
                <p><Link to="/forgot">Forgot Password</Link> </p>
                <p>I have no account. <Link to="/signup">Sign Up</Link></p>
            </div>
            </div>
        </div>
            </form>
        </div>
    </div>
      
        </>
    );
};

export default Login;
