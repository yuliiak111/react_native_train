import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

// Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>

const Home = ({ navigation }: HomeProps) => {
    return (
        <View>
            <Text>Home Screen</Text>
            <Button
                title="Go to details"

                // onPress={() => navigation.navigate('Details', {
                //     productId: '01',
                // })}

                // onPress={()=>navigation.navigate('Details')}

                onPress={() => navigation.push('Details', { productId: '01' })}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
