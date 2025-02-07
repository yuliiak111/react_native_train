import React, { useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
} from 'react-native';
import DiceOne from '../assets/One.png';
import DiceTwo from '../assets/Two.png';
import DiceThree from '../assets/Three.png';
import DiceFour from '../assets/Four.png';
import DiceFive from '../assets/Five.png';
import DiceSix from '../assets/Six.png';

const diceImages = [DiceOne, DiceTwo, DiceThree, DiceFour, DiceFive, DiceSix];

const Dice = ({ imageUrl, animation }: { imageUrl: ImageSourcePropType, animation: Animated.Value }) => {
  return (
    <Animated.View style={[styles.diceContainer, {
      transform: [{
        rotate: animation.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
        }),
      },
      ],
    }]}
    >
      <Image style={styles.diceImage} source={imageUrl} />
    </Animated.View>
  );
};

const App = () => {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceFive);
  const rotation = useState(new Animated.Value(0))[0];

  const rollDice = () => {
    const randomNumber = Math.floor(Math.random() * 6);
    setDiceImage(diceImages[randomNumber]);

    Animated.sequence([
      Animated.timing(rotation, {
        toValue: 1,
        duration: 500,
        easing: Easing.bounce,
        useNativeDriver: true,
      }),
      Animated.timing(rotation, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎲 Roll the Dice! 🎲</Text>
      <Dice imageUrl={diceImage} animation={rotation} />
      <Pressable style={styles.button} onPress={rollDice}>
        <Text style={styles.buttonText}>Roll the Dice</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  diceContainer: {
    marginBottom: 20,
  },
  diceImage: {
    width: 150,
    height: 150,
  },
  button: {
    backgroundColor: '#6200ea',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});
