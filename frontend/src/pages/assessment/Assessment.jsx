import React, { useState } from 'react';
import axios from 'axios';
import { Navbar,Footer } from '../../components';
import './assessment.css'; // Import the CSS file for styling
import { useCookies } from 'react-cookie';
const Assessment = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [cookies,setCookies]=useCookies(["access_token"])
    const [error, setError] = useState(null);
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
            setSelectedImage(file);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!selectedImage) return;

        setIsLoading(true);

        try {
            const response = await axios.post('http://127.0.0.1:8000/asd/asd_predict_image/', {image:selectedImage}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "Authorization":`Bearer ${cookies.access_token}`
                },
            });
            setError(null)
            setResult(response.data);
        } catch (error) {
            setError('Please Login first');
            setResult(null)
            console.error(error);
        } finally {
            setTimeout(()=>{setIsLoading(false);},2500)
            
        }
    };

    return (
        <>
        <Navbar />
        <div className="full-page">
            <div className="assessment-page">
                <h1 id='h1-heading1'>Welcome to ASD online Assessment</h1>
                <p>Assess and gain insights into Autism Spectrum Disorder (ASD) through our Online Test. Users can upload a
                    photo for a preliminary evaluation, recognizing that this tool serves an informational purpose and does not
                    replace professional diagnosis. Encouraging awareness and understanding, we provide guidance and recommend
                    consulting healthcare professionals for comprehensive assessments.
                </p>
            </div>
        </div>
            <div className="container_box">
                <form onSubmit={handleSubmit} encType="multipart/form-data" id="upload-form">
                    <div className="form-group">
                        <button type="button" id="upload-button" className="upload-button" onClick={() => document.getElementById('file-input').click()}>Select Photo</button>
                        <input type="file" id="file-input" name="file" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
                    <button type="submit" className="upload-button" disabled={isLoading}>Submit</button>
                    </div>
                </form>
                <div id="image-box" className="image-box">
                    {imagePreview && <img id="selected-image" src={imagePreview} alt="Selected Photo" />}
                </div>

                <div className="loader" id="loader" style={{ display: isLoading ? 'inline-block' : 'none' }}></div>
                <div id="result-section" className="result-section">
                {
                    result && <>
                    <div style={{display:'flex', alignItems:"center", justifyContent:"center", gap:"5px"}}>
                        <h2>
                            Prediction 
                        </h2>
                        :
                        <p style={{color:"blueviolet"}}>

                    {result?.prediction}
                        </p>
                    </div>
                    <div style={{display:"flex", alignItems:"center", justifyContent:"center", gap:"5px"}}>
                        <h2>
                            Accuray 
                        </h2>
                        :
                        <p style={{color:"blueviolet"}}>

                    {result?.accuracy}
                        </p>
                    </div>
                    <div style={{display:"flex",alignItems:"center", justifyContent:"center", gap:"5px"}}>
                        <h2>
                            Note 
                        </h2>
                        :
                        <p style={{color:"blueviolet"}}>

                    {result?.note}
                        </p>
                    </div>
                    </>
                }    
                {
                    error && <h2>
                        {error}
                    </h2>
                }
                </div>
            </div>
        <Footer />
        </>
    );
};

export default Assessment;
