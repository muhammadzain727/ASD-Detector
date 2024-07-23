import React from 'react';

const Loader = ({ width = '5px', height = '5px' }) => {
  const style = {
    width: width,
    height: height,
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  return (
    <div style={style}></div>
  );
};

export default Loader;
