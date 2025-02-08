import React, { useState } from "react";

const ProductTrackerForm = () => {
    const [productName, setProductName] = useState("");
    const [source, setSource] = useState("X-Kom");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!productName) {
            setMessage("Proszę podać nazwę produktu.");
            return;
        }

        try {
            setMessage("Trwa dodawanie produktu...");


            const url = new URL("http://127.0.0.1:8000/api/");
            url.searchParams.append("product_name", productName);
            url.searchParams.append("source", source);

            const response = await fetch(url, {
                method: "GET",
            });


            if (response.ok) {
                setMessage("Produkt został pomyślnie dodany do śledzenia!");
            } else {
                setMessage("Wystąpił problem podczas dodawania produktu.");
            }
        } catch (error) {
            setMessage(`Błąd: ${error.message}`);
        }
    };

    return (
        <div className="product-tracker-form">
            <h2>Śledzenie Ceny Produktu</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="productName">Nazwa produktu:</label>
                    <input
                        type="text"
                        id="productName"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Wprowadź nazwę produktu"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="source">Źródło:</label>
                    <select
                        id="source"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                    >
                        <option value="X-Kom">X-Kom</option>
                        <option value="Morele">Morele</option>
                        <option value="MediaExpert">MediaExpert</option>
                    </select>
                </div>

                <button type="submit">Śledź produkt</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
};

export default ProductTrackerForm;
