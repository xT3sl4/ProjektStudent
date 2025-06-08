// src/PriceChart.tsx

import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    ActivityIndicator,
    Dimensions,
    StyleSheet,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

interface PriceEntry {
    source: string;
    timestamp: string;
    price: number;
}

interface PriceChartProps {
    productName: string;
}

export default function PriceChart({ productName }: PriceChartProps) {
    const API_BASE_URL = "http://192.168.1.132:8000/api";

    const [priceData, setPriceData] = useState<PriceEntry[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!productName) return;

        setLoading(true);
        setPriceData([]);

        const fetchHistory = async () => {
            try {
                const response = await fetch(
                    `${API_BASE_URL}/price-history/${encodeURIComponent(productName)}/`
                );
                const data: PriceEntry[] = await response.json();
                setPriceData(data);
            } catch (error) {
                console.error("Error fetching price data:", error);
                setPriceData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [productName]);

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    if (!priceData || priceData.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.heading}>Brak danych do wyświetlenia</Text>
            </View>
        );
    }

    const groupedData: Record<string, Array<{ timestamp: string; price: number }>> = {};

    priceData.forEach((entry) => {
        if (!groupedData[entry.source]) {
            groupedData[entry.source] = [];
        }
        groupedData[entry.source].push({
            timestamp: entry.timestamp,
            price: entry.price,
        });
    });

    const labels: string[] = priceData.length > 0 ? priceData.map(entry => entry.timestamp.split("T")[0]) : [];

    const datasets = Object.keys(groupedData).length > 0 ? Object.keys(groupedData).map((source) => ({
        data: groupedData[source].map(e => e.price),
        color: (opacity = 1) => {
            if (source === "X-Kom") return `rgba(0, 72, 160, ${opacity})`;
            if (source === "MediaExpert") return `rgba(255, 213, 0, ${opacity})`;
            if (source === "Morele") return `rgba(255, 108, 0, ${opacity})`;
            return `rgba(0, 0, 0, ${opacity})`;
        },
        strokeWidth: 2,
        name: source,
    })) : [];

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        backgroundGradientTo: "#fff",
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(34, 34, 34, ${opacity})`,
        propsForDots: {
            r: "3",
            strokeWidth: "1",
            stroke: "#333",
        },
    };

    const screenWidth = Dimensions.get("window").width * 0.9;

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Price History for {productName}</Text>
            <LineChart
                data={{
                    labels,
                    datasets,
                    legend: Object.keys(groupedData),
                }}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                bezier
                style={styles.chart}
            />
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
    chart: {
        borderRadius: 8,
    },
});
