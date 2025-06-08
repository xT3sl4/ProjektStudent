import React, { useState } from "react";
import { View, Button, Text, Alert, StyleSheet } from "react-native";

export default function GetPricesButton() {
    const [message, setMessage] = useState("");

    const handleClick = async () => {
        setMessage("Reloading...");
        try {
            const response = await fetch("http://192.168.1.132:8000/api/get_prices/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Response Status:", response.status);

            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setMessage(data.message);
            } else {
                console.error("Server error:", response.statusText);
                setMessage("Server error: " + response.statusText);
            }
        } catch (error) {
            console.error("Error fetching prices:", error);
            Alert.alert("Error", "Error fetching prices");
            setMessage("");
        }
    };

    return (
        <View style={styles.wrapper}>
            <Button title="Reload Prices" onPress={handleClick} />
            {message.length > 0 && <Text style={styles.msg}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        alignItems: "center",
    },
    msg: {
        marginTop: 8,
        fontSize: 14,
        color: "#333",
    },
});