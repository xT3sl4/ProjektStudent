import React, { useState } from "react";
import {
    View,
    Button,
    FlatList,
    Text,
    TouchableOpacity,
    Linking,
    StyleSheet,
    ListRenderItem,
} from "react-native";

type TrackedProduct = {
    product_name: string;
    source: string;
    link: string;
};

export default function GetTrackedList() {
    const [products, setProducts] = useState<TrackedProduct[]>([]);
    const API_BASE_URL = "http://192.168.1.132:8000/api";

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/get/`);
            if (!response.ok) throw new Error("Failed to fetch products");
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const renderItem: ListRenderItem<TrackedProduct> = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.product_name}</Text>
            <Text style={styles.subTitle}>{item.source}</Text>
            <TouchableOpacity
                onPress={() => Linking.openURL(item.link)}
                style={styles.linkButton}
            >
                <Text style={styles.linkText}>View</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <FlatList
            data={products}
            keyExtractor={(_, index) => index.toString()}
            renderItem={renderItem}
            ListHeaderComponent={
                <Button title="Load Tracked Products" onPress={fetchProducts} />
            }
            ListFooterComponent={
                <Button title="Exit List" onPress={() => setProducts([])} />
            }
            contentContainerStyle={styles.listContainer}
        />
    );
}

const styles = StyleSheet.create({
    listContainer: {
        alignItems: "center",
        paddingBottom: 20,
    },
    itemContainer: {
        marginBottom: 12,
        padding: 8,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 4,
    },
    title: {
        fontWeight: "600",
        fontSize: 16,
    },
    subTitle: {
        fontSize: 14,
        color: "#555",
        marginVertical: 4,
    },
    linkButton: {
        marginTop: 4,
    },
    linkText: {
        color: "#007AFF",
    },
});