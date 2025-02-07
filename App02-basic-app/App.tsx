import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import FlatCards from './components/FlatCards';
import ElevatedCards from './components/ElevatedCards';
import FancyCard from './components/FancyCard';
import ActionCard from './components/ActionCard';
import ContactList from './components/ContactList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <FlatCards />
        <ElevatedCards />
        <FancyCard />
        <ActionCard />
        <ContactList />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
export default App;
