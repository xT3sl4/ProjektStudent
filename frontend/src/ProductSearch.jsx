import { useState } from "react";

export default function ProductSearch() {
  const [query, setQuery] = useState("");
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  const searchProduct = async () => {
    setError(null);
    setProduct(null);
    try {
      const response = await fetch(`http://localhost:8000/api/search_product?query=${query}&userId=1`);
      const data = await response.json();
      if (response.ok) {
        setProduct(data.product);
      } else {
        setError(data.error || "No product found");
      }
    } catch (err) {
      setError("An error occurred while fetching data");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <input
        type="text"
        className="border p-2 w-full rounded"
        placeholder="Enter product name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded mt-2 w-full"
        onClick={searchProduct}
      >
        Search
      </button>
      {product && (
        <div className="mt-4 p-4 border rounded">
          <h3 className="text-lg font-bold">{product.name}</h3>
          <a href={product.link} className="text-blue-500" target="_blank" rel="noopener noreferrer">
            View Product
          </a>
        </div>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
