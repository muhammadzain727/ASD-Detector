// myproject/frontend/src/components/ArticlePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './article.css'; // Import the CSS file for styling
import { Footer, Navbar } from '../../components';

const articles = [
    {
      id: 1,
      title: 'What to know about autism',
      content: 'Autism spectrum disorder (ASD) accounts...',
      url: 'https://www.medicalnewstoday.com/articles/323758',
    },
    {
      id: 2,
      title: 'Autism Spectrum Disorder symptoms',
      content: 'child has a few autism-like symptoms, it doesn’t mean they have Autism Spectrum Disorder...',
      url: 'https://www.helpguide.org/articles/autism-learning-disabilities/autism-spectrum-disorders.htm',
    },
    {
      id: 3,
      title: '6 key facts about autism spectrum disorder',
      content: 'Each person is affected differently and symptoms can change over time...',
      url: 'https://magazine.medlineplus.gov/article/6-key-facts-about-autism-spectrum-disorder/',
    },
    {
        id: 4,
        title: 'Eye tracking technology holds promise for earlier autism diagnosis',
        content: 'What if you could diagnose autism just by looking at how a childs eyes move?',
        url: 'https://magazine.medlineplus.gov/article/eye-tracking-technology-holds-promise-for-earlier-autism-diagnosis/',
      },
  ];

const Article = ({ articleUrl }) => {
  return (
    <>
    <Navbar/>
    <div className="container12">
      <h1>Articles</h1>
      <div className="articles-list">
        {articles.map((article) => (
          <div key={article.id} className="card">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Article;
