import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function FlatCards() {
    return (
        <View>
            <Text style={styles.headingText}>Love Life</Text>
            <View style={styles.container}>
                <View style={[styles.card, styles.card1]}>
                    <Text>Ifraheem</Text>
                </View>
                <View style={[styles.card, styles.card2]}>
                    <Text>Shia/Sunni</Text>
                </View>
                <View style={[styles.card, styles.card3]}>
                    <Text>CHAKWAL</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 10,
        gap: 8,
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100,
        borderRadius: 4,
        // margin: 8,
    },
    card1: {
        backgroundColor: '#EF5354',
    },
    card2: {
        backgroundColor: '#50DBB4',
    },
    card3: {
        backgroundColor: '#5DA3FA',
    },
});
