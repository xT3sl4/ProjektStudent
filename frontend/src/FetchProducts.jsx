import React, { useState } from "react";
import PriceChart from "./PriceChart";

export default function FetchProducts() {
    const [productName, setProductName] = useState("");
  
    return (
        <>
            <h2>Product Price Statistics</h2>
            <input
            type="text"
            placeholder="Enter product name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            />
            
            {productName && <PriceChart productName={productName} />}
        </>
    );
}