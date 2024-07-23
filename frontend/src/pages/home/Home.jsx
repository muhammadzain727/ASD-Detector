import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar,Footer } from '../../components';
import "./home_.css"
const Home = () => {
    return (
        <>
        <Navbar />
        <div className="home">
            <div className="half-page">
                <div className="content">
                    <h1 id='h1-heading' >Welcome to ASD Detector</h1>
                    <p>
                        At ASD Detector, we believe in the strength of community, understanding, and support. Our mission is to
                        create a welcoming space for individuals on the Autism Spectrum and their families, fostering a sense of
                        connection and providing valuable resources.
                    </p>
                </div>
            </div>

            <div className="half-page-1">
                <div className="content-1">
                    <p>
                        We understand the critical importance of early detection and intervention. By focusing on identifying
                        signs of ASD in children, we aim to empower families with the knowledge they need for timely and
                        effective support. Recognizing the uniqueness of every child, our detection approach is tailored to
                        capture the diverse expressions of ASD.
                    </p>
                    <Link to="/assessment" className="assessment-btn">Assessment Center</Link>
                </div>
            </div>

            <div className="half-page-2">
                <div className="left-content">
                    <p>
                        Discover profound insights and personal stories in our 'About' section, where we share the mission,
                        vision, and the compassionate faces behind our commitment to supporting and raising awareness for Autism
                        Spectrum Disorder.
                    </p>
                    <Link to="/about" className="about-btn">About</Link>
                </div>
                <div className="right-content">
                    <p>
                        Explore expert insights and reviews in our 'Article Desk,' where leading autism specialists share their
                        valuable perspectives, research findings, and recommendations for a deeper understanding of Autism
                        Spectrum Disorder.
                    </p>
                    <Link to="/chatbot" className="article-btn">Article Desk</Link>
                </div>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Home;
