import { StatusBar, StyleSheet, Text, TouchableOpacity, View, Animated, LayoutAnimation } from 'react-native';
import React, { useState } from 'react';

const generateRandomColor = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
};

const App = () => {
  const [shapeColors, setShapeColors] = useState(Array(8).fill('#FFFFFF'));
  const buttonScale = new Animated.Value(1);
  const [shapesConfig] = useState(
    Array(10).fill(null).map((_, i) => ({
      id: i,
      position: {
        top: `${Math.random() * 80 + 5}%`, // Convert to string with '%'
        left: `${Math.random() * 80 + 5}%`, // Convert to string with '%'
      },
      size: Math.random() * 60 + 30,
      borderRadius: Math.random() > 0.5 ? 50 : Math.random() * 30,
      rotation: Math.random() * 360,
    }))
  );

  const handlePress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setShapeColors(Array(10).fill(null).map(generateRandomColor));

    Animated.sequence([
      Animated.spring(buttonScale, { toValue: 0.9, useNativeDriver: true }),
      Animated.spring(buttonScale, { toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  return (
    <>
      <StatusBar backgroundColor="#2A2A2A" />
      <View style={styles.container}>
        {shapesConfig.map((shape, i) => (
          <View
            key={shape.id}
            style={[
              styles.shape,
              {
                backgroundColor: shapeColors[i],
                top: shape.position.top,
                left: shape.position.left,
                width: shape.size,
                height: shape.size,
                borderRadius: shape.borderRadius,
                transform: [{ rotate: `${shape.rotation}deg` }],
              },
            ]}
          />
        ))}

        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
            <View style={styles.actionBtn}>
              <Text style={styles.actionBtnText}>Color Burst!</Text>
            </View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
  },
  shape: {
    position: 'absolute',
    opacity: 0.9,
  },
  actionBtn: {
    borderRadius: 25,
    backgroundColor: '#FF6B6B',
    paddingVertical: 15,
    paddingHorizontal: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  actionBtnText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
});

export default App;