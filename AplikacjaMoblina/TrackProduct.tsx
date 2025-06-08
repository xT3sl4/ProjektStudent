import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    FlatList,
    TouchableOpacity,
    Linking,
    StyleSheet,
    Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

type Product = {
    title: string;
    link: string;
    source: string;
};

export default function TrackProduct() {
    const [productName, setProductName] = useState<string>("");
    const [store, setStore] = useState<"xkom" | "morele" | "mediaexpert">("xkom");
    const [message, setMessage] = useState<string>("");
    const [products, setProducts] = useState<Product[]>([]);
    const API_BASE_URL = "http://192.168.1.132:8000/api";
    const userId = 1;
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Funkcja fetchująca produkty na podanej stronie
    const fetchProducts = async (pageToLoad: number) => {
        if (loading || !hasMore) return;

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE_URL}/track-product/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product_name: productName,
                    store,
                    page: pageToLoad,
                }),
            });

            const data = await response.json();

            if (response.ok && data.products?.length > 0) {
                setProducts(prev => pageToLoad === 1 ? data.products : [...prev, ...data.products]);
                setPage(pageToLoad + 1);
                setHasMore(data.products.length > 0);
                setMessage("");
            } else {
                if (pageToLoad === 1) setMessage(data.error || "Nie znaleziono produktów.");
                setHasMore(false);
            }
        } catch (error) {
            console.error("Błąd:", error);
            setMessage("Błąd połączenia z serwerem.");
            setHasMore(false);
        } finally {
            setLoading(false);
        }
    };

    // Start wyszukiwania (nowa lista, strona 1)
    const trackProduct = () => {
        setMessage("Szukam produktów...");
        setProducts([]);
        setPage(1);
        setHasMore(true);
        fetchProducts(1);
    };

    const saveProduct = async (product: Product, productName: string, store: string) => {
        try {
            const response = await fetch(`${API_BASE_URL}/save-tracked-product/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title: productName,  // tutaj wpisane co było w polu tekstowym
                    link: product.link,
                    store: store,        // tutaj aktualny sklep
                    user_id: userId,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Sukces", "Produkt został dodany do śledzenia.");
            } else {
                Alert.alert("Błąd", data.error || "Nie udało się dodać produktu.");
            }
        } catch (err) {
            Alert.alert("Błąd sieci", "Sprawdź połączenie z serwerem.");
        }
    };


    const renderItem = ({ item }: { item: Product }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.source}</Text>
            <TouchableOpacity onPress={() => Linking.openURL(item.link)} style={styles.linkButton}>
                <Text style={styles.linkText}>View</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => saveProduct(item, productName, store)}
                style={styles.trackButton}
            >
                <Text style={styles.trackText}>Śledź</Text>
            </TouchableOpacity>

        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Track Product</Text>

            <TextInput
                style={styles.input}
                placeholder="Wpisz nazwę produktu"
                value={productName}
                onChangeText={setProductName}
            />

            <View style={styles.pickerWrapper}>
                <Picker
                    selectedValue={store}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                        setStore(itemValue as "xkom" | "morele" | "mediaexpert")
                    }
                >
                    <Picker.Item label="X-KOM" value="xkom" />
                    <Picker.Item label="Morele" value="morele" />
                    <Picker.Item label="Media Expert" value="mediaexpert" />
                </Picker>
            </View>

            <Button title="Szukaj" onPress={trackProduct} />

            {message.length > 0 && <Text style={styles.msg}>{message}</Text>}

            <FlatList
                data={products}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContainer}
                onEndReached={() => fetchProducts(page)}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 8,
        flex: 1,
    },
    heading: {
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 8,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 6,
        marginBottom: 12,
    },
    pickerWrapper: {
        backgroundColor: "#000000",
    },
    picker: {
        color: "#fff",
    },
    msg: {
        marginVertical: 8,
        color: "#333",
    },
    listContainer: {
        marginTop: 12,
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
    trackButton: {
        marginTop: 4,
    },
    trackText: {
        color: "#00AA00",
    },
});
