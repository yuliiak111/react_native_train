import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Linking,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [gameWinner, setGameWinner] = useState('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty'));
  const [winningLine, setWinningLine] = useState<number[]>([]);

  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const cellScales = useRef(new Array(9).fill(null).map(() => new Animated.Value(1))).current;

  // Grid entrance animation - applied per cell
  const gridAnimRefs = useRef(
    new Array(9).fill(null).map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    gridAnimRefs.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: 1,
        duration: 300 + index * 50,
        easing: Easing.elastic(1.2),
        useNativeDriver: true,
      }).start();
    });
  }, []);

  const reloadGame = () => {
    fadeAnim.setValue(0);
    setIsCross(false);
    setGameWinner('');
    setWinningLine([]);
    setGameState(new Array(9).fill('empty'));

    Snackbar.show({
      text: 'New Round! Ready to Play?',
      backgroundColor: '#FFF',
      textColor: '#000',
    });
  };

  const checkIsWinner = (newGameState: string[]) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newGameState[a] !== 'empty' &&
        newGameState[a] === newGameState[b] &&
        newGameState[a] === newGameState[c]
      ) {
        setGameWinner(`${newGameState[a]} Wins!`);
        setWinningLine(pattern);

        Snackbar.show({
          text: `${newGameState[a]} Wins!`,
          backgroundColor: '#26de81',
          textColor: '#000',
        });

        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }).start();

        return;
      }
    }

    if (!newGameState.includes('empty')) {
      setGameWinner('Game Tied');
      Snackbar.show({
        text: 'Game Tied',
        backgroundColor: '#FFD700',
        textColor: '#000',
      });
    }
  };

  const onChangeItem = (index: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: '#FF0000',
        textColor: '#FFF',
      });
    }

    if (gameState[index] === 'empty') {
      Animated.sequence([
        Animated.timing(cellScales[index], {
          toValue: 0.95,
          duration: 70,
          useNativeDriver: true,
        }),
        Animated.spring(cellScales[index], {
          toValue: 1,
          friction: 3,
          useNativeDriver: true,
        })
      ]).start();

      const newGameState = [...gameState];
      newGameState[index] = isCross ? 'cross' : 'circle';
      setGameState(newGameState);
      setIsCross(!isCross);
      checkIsWinner(newGameState);
    } else {
      Snackbar.show({
        text: 'Spot Already Taken',
        backgroundColor: 'red',
        textColor: '#FFF',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Game Status */}
      <View style={styles.statusContainer}>
        {gameWinner ? (
          <Animated.Text
            style={[
              styles.statusText,
              styles.winnerText,
              {
                opacity: fadeAnim,
                transform: [{ scale: fadeAnim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1] }) }]
              }
            ]}
          >
            {gameWinner}
          </Animated.Text>
        ) : (
          <Text style={styles.statusText}>Player {isCross ? 'X' : 'O'}'s Turn</Text>
        )}
      </View>

      {/* Game Grid */}
      <FlatList
        data={gameState}
        numColumns={3}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            style={({ pressed }) => [
              styles.cell,
              winningLine.includes(index) ? styles.winningCell : styles.defaultCell,
              { transform: [{ scale: pressed ? 0.95 : 1 }] }
            ]}
            onPress={() => onChangeItem(index)}
          >
            <Icons name={item} />
          </Pressable>
        )}
      />

      {/* Restart Button */}
      <Pressable
        style={styles.button}
        onPress={reloadGame}
      >
        <Text style={styles.buttonText}>{gameWinner ? 'Play Again' : 'Restart Game'}</Text>
      </Pressable>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Designed and Developed by </Text>
        <Pressable onPress={() => Linking.openURL('https://github.com/saranzafar')}>
          <Text style={styles.footerLink}>saranzafar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

/** Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  statusContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#111',
    borderRadius: 15,
    width: '90%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  statusText: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FFF',
  },
  winnerText: {
    color: '#FFD700',
  },
  cell: {
    width: 95,
    height: 95,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 4,
    borderRadius: 15,
  },
  defaultCell: {
    backgroundColor: '#000',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  winningCell: {
    backgroundColor: '#F2F2F2',
    borderColor: '#FFD700',
  },
  button: {
    marginTop: 15,
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
  },
  footerText: {
    color: '#F2F2F2',
    fontSize: 12,
  },
  footerLink: {
    color: '#4A90E2',
    fontSize: 13,
    fontWeight: 'bold',
  },
});

export default App;
