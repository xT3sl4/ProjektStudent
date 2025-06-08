import React, { useEffect, useState } from 'react';
import GetTrackedList from './GetTrackedList';
import FetchProducts from './FetchProducts';
import Track from './TrackProduct';
import GetPricesButton from './GetPricesButton';
import { ScrollView, Text } from 'react-native';

const App: React.FC = () => {
    const [color, setColor] = useState('red');
    const API_BASE_URL = 'http://192.168.1.132:8000/api';

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/welcome/`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                console.log('Fetched data:', data);
                setColor('green');
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error fetching products:', error.message);
                } else {
                    console.error('Unknown error:', error);
                }
            }
        };

        fetchProducts();
    }, []);

    return (
        <ScrollView>
            <GetTrackedList />
            <FetchProducts />
            <Track />
            <GetPricesButton />
        </ScrollView>
    );
};

export default App;