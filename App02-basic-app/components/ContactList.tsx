import { Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ContactList = () => {
    const contacts = [
        {
            uid: 1,
            name: 'Emily Johnson',
            role: 'Senior Education Consultant',
            number: '+1 (555) 123-4567',
            imageUrl: 'https://randomuser.me/api/portraits/women/45.jpg',
        },
        {
            uid: 2,
            name: 'Michael Chen',
            role: 'Curriculum Developer',
            number: '+1 (555) 987-6543',
            imageUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
        },
        {
            uid: 3,
            name: 'Sarah Al-Mansoori',
            role: 'Learning Strategist',
            number: '+1 (555) 246-8102',
            imageUrl: 'https://randomuser.me/api/portraits/women/87.jpg',
        },
    ];

    return (
        <View
            style={styles.container}
        >
            <Text style={styles.sectionTitle}>Contacts</Text>
            {contacts.map((contact, index) => (
                <View key={contact.uid}>
                    <View style={styles.contactCard}>
                        <Image
                            source={{ uri: contact.imageUrl }}
                            style={styles.profileImage}
                        />
                        <View style={styles.textContainer}>
                            <Text style={styles.name}>{contact.name}</Text>
                            <Text style={styles.role}>{contact.role}</Text>
                            <Text style={styles.number}>{contact.number}</Text>
                        </View>
                    </View>

                    {index !== contacts.length - 1 && <View style={styles.divider} />}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 24,
        fontWeight: '700',
        color: '#2d3436',
        marginBottom: 20,
        fontFamily: Platform.OS === 'ios' ? 'Helvetica Neue' : 'Roboto',
    },
    container: {
        padding: 16,
    },
    contactCard: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        backgroundColor: '#F8F9FA',

    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
        borderWidth: 1,
        borderColor: '#F0F0F0',
    },
    textContainer: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1A1A1A',
        marginBottom: 2,
    },
    role: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 4,
    },
    number: {
        fontSize: 14,
        color: '#3B82F6',
        fontWeight: '500',
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E7EB',
        marginVertical: 8,
        marginHorizontal: 16,
    },
});

export default ContactList;
