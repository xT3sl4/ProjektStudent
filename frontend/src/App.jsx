import React from "react";
// import ProductSearch from "./ProductSearch";
import Track from "./Track";
import GetPricesButton from "./GetPrices";
import FetchProducts from "./FetchProducts";
import GetTrackedList from "./GetTrackedList";
import { useState } from "react";


function App() {
      const [color, setColor] = useState("red");
      const API_BASE_URL = "http://127.0.0.1:8000/api"; 
      const fetchProducts = async () => {
          try {
            const response = await fetch(`${API_BASE_URL}/welcome/`);
            if (!response.ok) {
              throw new Error("Failed to fetch products");
            }
            const data = await response.json();
            setColor("green")
          } catch (error) {
            console.error("Error fetching products:", error);
          }
        };
        fetchProducts();
        
  return (
    <div style={{ textAlign: "center", width: "100%", minHeight:"100vh", margin: "auto", border: `3px solid ${color}`}}>
      <GetTrackedList />
      <hr />
      <FetchProducts/>
      <hr />
      <Track/>
      {/* <ProductSearch /> */}
      <hr />
      <GetPricesButton />
    </div>
    
  );
}

export default App;
