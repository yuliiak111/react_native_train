import { Text, StyleSheet, View, Image, useWindowDimensions } from 'react-native';
import React from 'react';

const FancyCard = () => {
    const { width } = useWindowDimensions();

    return (
        <View style={styles.container}>
            <Text style={styles.headingText}>Trending Places</Text>
            <View style={[styles.card, styles.cardElevated]}>
                <Image
                    source={{
                        uri: 'https://cdn.theatlantic.com/thumbor/vGlgCHO8cyLd903p_bNnLANsS9Q=/0x131:2555x1568/828x466/media/img/mt/2017/06/shutterstock_319985324/original.jpg',
                    }}
                    style={[styles.cardImage, { width: width - 32 }]}
                    resizeMode="cover"
                />
                <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>Murree Hill Station</Text>
                    <View style={styles.cardLabelContainer}>
                        <Text style={styles.cardLabel}>Pakistan • Mountain Resort</Text>
                        <Text style={styles.cardRating}>⭐ 4.8</Text>
                    </View>
                    <Text style={styles.cardDescription}>
                        Murree is a popular hill station and summer resort in northern Pakistan,
                        known for its pleasant weather and scenic views of the Himalayan foothills.
                    </Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    headingText: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 12,
        color: '#1a1a1a',
    },
    card: {
        borderRadius: 12,
        marginHorizontal: 16,
        backgroundColor: '#ffffff',
    },
    cardElevated: {
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    cardImage: {
        height: 200,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    cardBody: {
        padding: 16,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: '800',
        marginBottom: 8,
        color: '#2d3436',
    },
    cardLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    cardLabel: {
        fontSize: 14,
        color: '#636e72',
        fontWeight: '500',
    },
    cardRating: {
        fontSize: 14,
        color: '#e17055',
        fontWeight: '600',
    },
    cardDescription: {
        fontSize: 15,
        lineHeight: 22,
        color: '#2d3436',
        marginBottom: 16,
    },
    cardFooter: {
        fontSize: 14,
        color: '#0984e3',
        fontWeight: '600',
    },
});

export default FancyCard;
