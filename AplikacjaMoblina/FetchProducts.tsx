import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import PriceChart from "./PriceChart";

export default function FetchProducts() {
    const [productName, setProductName] = useState("");
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Product Price Statistics</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter product name"
                value={productName}
                onChangeText={(text) => setProductName(text)}
            />
            {productName.length > 0 && <PriceChart productName={productName} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    heading: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: "600",
    },
    input: {
        width: "100%",
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginBottom: 12,
    },
});