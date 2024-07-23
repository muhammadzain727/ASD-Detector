import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-column">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Assessment Center</a></li>
                    <li><a href="#">Article Desk</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">FAQ</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Contact Us</h3>
                <ul>
                    <li><a href="#">Instagram</a></li>
                    <li><a href="#">Facebook</a></li>
                    <li><a href="#">Twitter</a></li>
                    <li><a href="#">LinkedIn</a></li>
                </ul>
            </div>
            <div className="footer-column">
                <h3>Contact Information</h3>
                <p>Email: info@example.com</p>
                <p>Phone: +123-456-7890</p>
                <h3>Address</h3>
                <p>123 Main Street, Cityville, XYZ 12345</p>
            </div>
            <div className="footer-line">
                <p>Copyright © 2024 ASD Detector. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;