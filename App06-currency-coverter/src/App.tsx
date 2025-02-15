// App.tsx
import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
  StyleSheet,
} from 'react-native';
import { currencyByRupee } from './constant';
import Snackbar from 'react-native-snackbar';
import CurrencyButton from './components/CurrencyButton';
import { Currency } from './index';

function App(): JSX.Element {
  // Set default as Pakistani Rupee. (You can adjust the value for PKR as needed.)
  const defaultCurrency =
    currencyByRupee.find(currency => currency.name === 'PAKISTANI RUPEE') ||
    currencyByRupee[0];

  const [inputValue, setInputValue] = useState('');
  const [resultValue, setResultValue] = useState('');
  const [selectedCurrency, setSelectedCurrency] =
    useState<Currency>(defaultCurrency);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter the list based on search query.
  const filteredCurrencies = currencyByRupee.filter(currency =>
    currency.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handles conversion from PKR to the selected currency.
  const handleCurrencySelection = (currency: Currency) => {
    setSelectedCurrency(currency);
    if (!inputValue) {
      return Snackbar.show({
        text: 'Please enter the amount in PKR',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#FF4444',
        textColor: '#FFFFFF',
      });
    }
    const inputAmount = parseFloat(inputValue);
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * currency.value;
      const result = `${inputAmount} PKR = ${currency.symbol}${convertedValue.toFixed(2)}`;
      setResultValue(result);
    } else {
      return Snackbar.show({
        text: 'Please enter a valid number',
        backgroundColor: '#FF4444',
        textColor: '#FFFFFF',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Pakistani Rupee (PKR)</Text>
        <View style={styles.amountInput}>
          <TextInput
            style={styles.input}
            maxLength={14}
            value={inputValue}
            onChangeText={text => {
              setInputValue(text);
              // Recalculate conversion when input changes and a valid amount is provided.
              const amount = parseFloat(text);
              if (!isNaN(amount)) {
                const converted = amount * selectedCurrency.value;
                setResultValue(
                  `${amount} PKR = ${selectedCurrency.flag} ${selectedCurrency.name} ${selectedCurrency.symbol}${converted.toFixed(2)}`
                );
              } else {
                setResultValue('');
              }
            }}
            keyboardType="numeric"
            placeholder="Enter amount"
            placeholderTextColor="#666"
          />
        </View>
      </View>

      {/* Result Display */}
      {resultValue ? (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>{resultValue}</Text>
        </View>
      ) : null}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search currencies..."
          placeholderTextColor="#666"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Currency Grid */}
      <FlatList
        data={filteredCurrencies}
        keyExtractor={item => item.name}
        numColumns={3}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => {
          const isSelected = item.name === selectedCurrency.name;
          return (
            <Pressable
              style={({ pressed }) => [
                styles.currencyButton,
                isSelected && styles.selectedCurrencyButton,
                { transform: [{ scale: pressed ? 0.95 : 1 }] },
              ]}
              onPress={() => handleCurrencySelection(item)}
            >
              <CurrencyButton {...item} />
            </Pressable>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No currencies found</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#333',
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  inputContainer: {
    padding: 20,
    paddingBottom: 10,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '500',
  },
  amountInput: {
    backgroundColor: '#333',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  input: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
  },
  resultContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  resultText: {
    color: '#4CAF50',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  searchInput: {
    backgroundColor: '#333',
    color: '#fff',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
  },
  grid: {
    paddingHorizontal: 10,
  },
  currencyButton: {
    flex: 1,
    margin: 6,
    backgroundColor: '#333',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCurrencyButton: {
    backgroundColor: '#4CAF50',
  },
  emptyText: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});

export default App;
