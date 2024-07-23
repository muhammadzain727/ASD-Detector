import React, { useState } from 'react';
import axios from 'axios';
import { Navbar,Footer } from '../../components';
import './chatbot.css'; // Import the CSS file for styling
import { useCookies } from 'react-cookie';
const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies(['access_token']);
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inputValue=="") return;

        const newMessage = { type: 'user', text: inputValue };
        setMessages([...messages, newMessage]);
        setDisabled(true)

        try {
            const response = await fetch('http://127.0.0.1:8000/asd/chatbot/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${cookies.access_token}`
                },
                body: JSON.stringify({ UserMessage: inputValue })
                
            });

            if (response.ok) {
                const data = await response.json();
                const botMessage = { type: 'bot', text: data.AIMessage };
                setMessages([...messages, newMessage, botMessage]);
                setDisabled(false)
            } else {
                setMessages([...messages, newMessage, { type: 'bot', text: 'Please Login first.' }]);
                setDisabled(false)
            }
        } catch (error) {
            console.error('Error:', error);
            setMessages([...messages, newMessage, { type: 'bot', text: 'Error: Unable to get response.' }]);
            setDisabled(false)
        }
        setInputValue('');
    };

    return (
        <>
        <Navbar />
        <div id="chat-container">
            <div id="chat-box">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.type}`}>{msg.text}</div>
                ))}
            </div>
            <form id="chat-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    disabled={disabled}
                    id="chat-input"
                    placeholder="Type a message..."
                    autoComplete="off"
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button type="submit">Send</button>
            </form>
        </div>
        <Footer />
        </>
    );
};

export default Chatbot;
