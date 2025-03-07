import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import { useNavigation } from '@react-navigation/native';

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>

const Details = ({ route }: DetailsProps) => {
    const { productId } = route.params;

    // Fix 1: Correct navigation type
    const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();

    return (
        <View style={styles.container}>
            <Text>Details: {productId}</Text>
            <Button
                title="Go to home"
                // Fix 2: Remove extra .navigation and use navigate correctly
                onPress={() => navigation.navigate('Home')}
            />
            <Button
                title="Go back to first screen"
                // Fix 3: Remove extra .navigation and keep popToTop
                onPress={() => navigation.popToTop()}
            />
        </View>
    );
};

export default Details;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
