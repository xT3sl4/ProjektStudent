import { useState } from "react";

const TrackProduct = () => {
  const [productName, setProductName] = useState("");
  const [store, setStore] = useState("xkom");
  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const trackProduct = async () => {
    setMessage("Searching for products...");
    setProducts([]);
    setSelectedProduct(null);

    try {
      const response = await fetch("http://localhost:8000/api/track-product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: productName,
          store,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
        setMessage("");
      } else {
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setMessage("Error connecting to the server");
    }
  };

  const saveProduct = async (product) => {
    setMessage("Saving product...");
    try {
      const response = await fetch("http://localhost:8000/api/save-tracked-product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: productName,
          link: product.link,
          store,
          user_id: 1, // Można dynamicznie pobierać ID użytkownika
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setProducts([]); // Po zapisaniu produktu wyczyść listę
        setMessage(data.message || "Product saved successfully");
      } else {
        setMessage(data.error || "Error saving product");
      }
    } catch (error) {
      setMessage("Error saving product");
    }
  };

  return (
    <div>
      <h2>Track Product</h2>
      <input
        type="text"
        placeholder="Enter product name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <select value={store} onChange={(e) => setStore(e.target.value)}>
        <option value="xkom">X-Kom</option>
        <option value="morele">Morele</option>
        <option value="mediaexpert">MediaExpert</option>
      </select>
      <button onClick={trackProduct}>Search</button>
      <p>{message}</p>

      {products.length > 0 && (
        <div>
          <h3>Select a Product</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <p>{product.title}</p>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  View Product
                </a>
                <button onClick={() => saveProduct(product)}>Save</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TrackProduct;
