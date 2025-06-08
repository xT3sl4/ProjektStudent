import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';

export default function ProductTrackerForm() {
    const [productName, setProductName] = useState("");
    const [source, setSource] = useState("xkom");
    const [message, setMessage] = useState("");

    const handleSubmit = async () => {
        if (productName.trim().length === 0) {
            setMessage("Proszę podać nazwę produktu.");
            return;
        }

        try {
            setMessage("Trwa dodawanie produktu...");

            // Use POST here for consistency with backend
            const response = await fetch("http://192.168.1.132:8000/api/add-product/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    product_name: productName,
                    source: source.toLowerCase(),
                    link: "" // if you have no link, send empty string or remove
                }),
            });

            if (response.ok) {
                setMessage("Produkt został pomyślnie dodany do śledzenia!");
            } else {
                setMessage("Wystąpił problem podczas dodawania produktu.");
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setMessage(`Błąd: ${error.message}`);
            } else {
                setMessage(`Nieznany błąd`);
            }
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Śledzenie Ceny Produktu</Text>
            <TextInput
                style={styles.input}
                placeholder="Nazwa produktu"
                value={productName}
                onChangeText={setProductName}
            />
            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={source}
                    style={styles.picker}
                    onValueChange={(itemValue) => setSource(itemValue)}
                >
                    <Picker.Item label="X-Kom" value="xkom" />
                    <Picker.Item label="Morele" value="morele" />
                    <Picker.Item label="MediaExpert" value="mediaexpert" />
                </Picker>
            </View>
            <Button title="Śledź produkt" onPress={handleSubmit} />
            {message.length > 0 && <Text style={styles.msg}>{message}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: "100%", padding: 8 },
    heading: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
    input: { borderColor: "#ccc", borderWidth: 1, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 6, marginBottom: 12 },
    pickerWrapper: { borderWidth: 1, borderColor: "#ccc", borderRadius: 4, marginBottom: 12 },
    picker: { height: 40, width: "100%" },
    msg: { marginTop: 8, color: "#333" },
});
