import {
    Image,
    Linking,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Platform
} from 'react-native';
import React from 'react';

export default function ActionCard() {
    function openWebsite(websiteLink: string) {
        Linking.openURL(websiteLink);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Latest Articles</Text>

            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <View style={styles.headerContainer}>
                        <Text style={styles.titleText}>
                            What's New in JavaScript 2025?
                        </Text>
                        <View style={styles.categoryContainer}>
                            <Text style={styles.categoryTag}>Technology</Text>
                        </View>
                    </View>

                    <Image
                        source={{
                            uri: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                        }}
                        style={styles.cardImage}
                        resizeMode="cover"
                    />

                    <View style={styles.bodyContainer}>
                        <Text style={styles.bodyText} numberOfLines={3}>
                            Explore the latest features in ES2024 including Temporal API, RegExp updates,
                            and new array methods. Discover how these changes can boost your productivity
                            and write cleaner, more efficient code.
                        </Text>
                    </View>

                    <View style={styles.footerContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => openWebsite('https://saranzafar.vercel.app')}
                        >
                            <Text style={styles.buttonText}>Read Article</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.button, styles.outlineButton]}
                            onPress={() => openWebsite('https://github.com/saranzafar')}
                        >
                            <Text style={[styles.buttonText, styles.outlineButtonText]}>Follow Developer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2d3436',
        marginBottom: 20,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
    },
    card: {
        borderRadius: 20,
        backgroundColor: '#ffffff',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
            },
            android: {
                elevation: 8,
            },
        }),
    },
    cardContent: {
        padding: 20,
    },
    headerContainer: {
        marginBottom: 16,
    },
    titleText: {
        fontSize: 20,
        fontWeight: '600',
        color: '#1a1a1a',
        marginBottom: 8,
        lineHeight: 28,
    },
    categoryContainer: {
        flexDirection: 'row',
        marginTop: 4,
    },
    categoryTag: {
        backgroundColor: '#4a90e2',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
        overflow: 'hidden',
    },
    cardImage: {
        height: 180,
        borderRadius: 12,
        marginBottom: 16,
    },
    bodyContainer: {
        marginBottom: 20,
    },
    bodyText: {
        fontSize: 15,
        lineHeight: 22,
        color: '#4a4a4a',
        fontWeight: '400',
    },
    footerContainer: {
        flexDirection: 'row',
        gap: 12,
        flexWrap: 'wrap',
    },
    button: {
        backgroundColor: '#4a90e2',
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 25,
        flex: 1,
        minWidth: '48%',
        alignItems: 'center',
    },
    outlineButton: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#4a90e2',
    },
    buttonText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 14,
    },
    outlineButtonText: {
        color: '#4a90e2',
    },
});