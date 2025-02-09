import React, { useState } from "react";

export default function GetTrackedList() {
    const [products, setProducts] = useState([]);
    const API_BASE_URL = "http://127.0.0.1:8000/api"; 
    const fetchProducts = async () => {
        try {
          const response = await fetch(`${API_BASE_URL}/get/`);
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          const data = await response.json();
          setProducts(data);
        } catch (error) {
          console.error("Error fetching products:", error);
        }
      };
    return(
        <>
            <button onClick={fetchProducts}>Load Tracked Products</button>
        
            <ul>
                {products.map((product, index) => (
                <li key={index}>
                    <strong>{product.product_name}</strong> - {product.source} -  
                    <a href={product.link} target="_blank" rel="noopener noreferrer">View</a>
                </li>
                ))}
            </ul>
        </>
    )
}