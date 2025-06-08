import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Linking,
    StyleSheet,
} from "react-native";

type Product = {
    name: string;
    link: string;
};

export default function ProductSearch() {
    const [query, setQuery] = useState("");
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);

    const searchProduct = async () => {
        setError(null);
        setProduct(null);
        try {
            const response = await fetch(
                `http://192.168.1.132:8000/api/search_product?query=${encodeURIComponent(
                    query
                )}&userId=1`
            );
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
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Enter product name"
                value={query}
                onChangeText={(text) => setQuery(text)}
            />
            <Button title="Search" onPress={searchProduct} />
            {product && (
                <View style={styles.resultBox}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <TouchableOpacity
                        onPress={() => Linking.openURL(product.link)}
                        style={styles.linkButton}
                    >
                        <Text style={styles.linkText}>View Product</Text>
                    </TouchableOpacity>
                </View>
            )}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 8,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginBottom: 12,
    },
    resultBox: {
        marginTop: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
    },
    productName: {
        fontSize: 16,
        fontWeight: "600",
    },
    linkButton: {
        marginTop: 6,
    },
    linkText: {
        color: "#007AFF",
    },
    errorText: {
        marginTop: 8,
        color: "#FF3B30",
    },
});
