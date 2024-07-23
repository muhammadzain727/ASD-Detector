// myproject/src/components/CompanyInfo.js
import React from 'react';
import { Navbar,Footer } from '../../../components';
import './about.css';
const AboutUs = () => {
  return (
    <>
    <Navbar/>
    <div className="container">
      {/* <div className="about">
        <p>ASD Detector is a web application that aims to help parents and caregivers detect autism spectrum disorder (ASD) in children. The application uses machine learning to analyze the responses to a set of questions and provide a probability of the child having ASD. The application also provides articles and resources to help parents and caregivers learn more about ASD and how to support children with ASD.</p>
      </div> */}

      <div className="about">
        <h1>Our Vision</h1>
        <p>Our vision is to create a world where children with autism spectrum disorder (ASD) are diagnosed early and receive the support they need to thrive. We believe that early detection and intervention can make a significant difference in the lives of children with ASD and their families. By providing a user-friendly and accessible tool for parents and caregivers, we hope to empower them to take action and seek help for their children.</p>
      </div>

      <div className="team">
        <h2>Our Team</h2>
        <div className="team-member">
          <img src="/images/ahmad.jpg" alt="Team Member 1" />
          <h3>Ahmad Hassan</h3>
          <img src="/images/zain.png" alt="Team Member 2" />
          <h3>Muhammad Zain</h3>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUs;
