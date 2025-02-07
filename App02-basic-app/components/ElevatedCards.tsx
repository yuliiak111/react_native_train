import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

export default function ElevatedCards() {
    return (
        <View >
            <Text style={styles.headingText}>Eelevated Cards</Text>
            <ScrollView style={[styles.container]} horizontal>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>Tab</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>Me</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>To</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>Scroll</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>Toward</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>Around</Text>
                </View>
                <View style={[styles.card, styles.cardElevated]}>
                    <Text>😎</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 10,
    },
    card: {
        width: 100,
        height: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4,
        margin: 4,
    },
    cardElevated: {
        backgroundColor: '#CAD5E2',
        elevation: 4,
        shadowOffset: {
            width: 1,
            height: 1,
        },
        shadowColor: '#333',
        shadowOpacity: 0.4,
    },
});
