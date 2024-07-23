import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import './Navbar.css';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Navbar = () => {
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const [profile, setProfile] = useState(null)
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
        return '';
      }
      const accessToken = getCookie('access_token');
      const handleLogout = () => {
        // Set the csrftoken cookie with an expiration date in the past to delete it
        document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        window.location.reload()
      };
      useEffect(()=>{
        axios.get("http://127.0.0.1:8000/asd/userprofile/",{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${cookies.access_token}`
            }
        }).then((res)=>{
            setProfile(res.data)
        })
      },[])
    return (
        <nav className="navbar">
            <div className="logo-left">
                <Link to="/">
                    <img src="/images/1__1_-removebg-preview.png" alt="Your Logo" />
                </Link>
            </div>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/assessment">Assessment Center</Link>
                <Link to="/chatbot">Assistent</Link>
                <Link to="/analytics">Analytics</Link>
                <Link to="/article">Article</Link>
                <Link to="/about">About</Link>
            </div>
            <div style={{display:"flex",gap:"25px", alignItems:"center"}}>
            {/* <div className="logo-right">
                
                <Link to={csrfToken ? "/":"/login"}>
                    <img src="/images/login logo.png" alt="Login Logo" />
                </Link>

            </div> */}
            <h2 style={{color:"white"}}>
                {
              profile && profile.name.split(" ")[0]
                }
            </h2>
            <div id='logout'>
                {
                    accessToken ? <button id='logoutBtn' onClick={handleLogout}>Logout</button> : <button id='logoutBtn' onClick={()=>navigate("/login")}>Login</button>

                }
            </div>
            </div>

        </nav>
    );
};

export default Navbar;
