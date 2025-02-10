import React from 'react';
import { useState } from 'react';

const GetPricesButton = () => {
    const [message, setMessage] = useState('');
    const handleClick = async () => {
        setMessage('Realoading...');
        try {
          const response = await fetch('http://localhost:8000/api/get_prices/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          console.log('Response Status:', response.status); 
      
          if (response.ok) {
            const data = await response.json();
            console.log(data);
            setMessage(data.message);
          } else {
            console.error('Server error:', response.statusText);
          }
        } catch (error) {
          console.error('Error fetching prices:', error);
          alert('Error fetching prices');
        }
      };
      

  return (
    <>
        <button onClick={handleClick}>Reaload Prices</button>
        {message && <p>{message}</p>}
    </>
  );
};

export default GetPricesButton;
