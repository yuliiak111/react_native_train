import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Hello World!</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Light gray background for contrast
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333', // Dark gray text color for visibility
  },
});

export default App;
