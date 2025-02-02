import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number()
    .min(4, 'Should be at least 4 characters')
    .max(16, 'Should be at most 16 characters')
    .required('This field is required'),
});

const App = () => {
  const [password, setPassword] = useState('');
  const [isPasswordGenerated, setIsPasswordGenerated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const UpperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const LowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const SymbolChars = '!@#$%^&*()_+~`|}{[]:';

    if (upperCase) { characterList += UpperCaseChars; }
    if (lowerCase) { characterList += LowerCaseChars; }
    if (numbers) { characterList += digitChars; }
    if (symbols) { characterList += SymbolChars; }

    const passwordResult = createPassword(characterList, passwordLength);
    setPassword(passwordResult);
    setIsPasswordGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={styles.scrollContent}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContainer}>
          <Text style={styles.title}>🔐 Password Generator</Text>

          <Formik
            initialValues={{ passwordLength: '' }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              generatePasswordString(+values.passwordLength);
            }}
          >
            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset,
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputHeader}>
                    <Text style={styles.label}>Password Length:</Text>
                    {touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput
                    style={styles.input}
                    value={values.passwordLength}
                    onChangeText={handleChange('passwordLength')}
                    placeholder="Enter length (4-16)"
                    placeholderTextColor="#888"
                    keyboardType="numeric"
                  />
                </View>

                <View style={styles.optionsContainer}>
                  <Text style={styles.optionsTitle}>Password Options:</Text>
                  <View style={styles.checkboxContainer}>
                    <View style={styles.checkboxWrapper}>
                      <BouncyCheckbox
                        size={25}
                        isChecked={lowerCase}
                        onPress={() => setLowerCase(!lowerCase)}
                        fillColor="#4CAF50"
                        text="Lowercase"
                        textStyle={styles.checkboxText}
                      />
                    </View>
                    <View style={styles.checkboxWrapper}>
                      <BouncyCheckbox
                        size={25}
                        isChecked={upperCase}
                        onPress={() => setUpperCase(!upperCase)}
                        fillColor="#2196F3"
                        text="Uppercase"
                        textStyle={styles.checkboxText}
                      />
                    </View>
                    <View style={styles.checkboxWrapper}>
                      <BouncyCheckbox
                        size={25}
                        isChecked={numbers}
                        onPress={() => setNumbers(!numbers)}
                        fillColor="#FF9800"
                        text="Numbers"
                        textStyle={styles.checkboxText}
                      />
                    </View>
                    <View style={styles.checkboxWrapper}>
                      <BouncyCheckbox
                        size={25}
                        isChecked={symbols}
                        onPress={() => setSymbols(!symbols)}
                        fillColor="#F44336"
                        text="Symbols"
                        textStyle={styles.checkboxText}
                      />
                    </View>
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.button, styles.generateButton, !isValid && styles.disabledButton]}
                    disabled={!isValid}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Generate Password</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.button, styles.resetButton]}
                    onPress={() => {
                      handleReset();
                      resetPassword();
                    }}
                  >
                    <Text style={styles.buttonText}>Reset</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>

          {isPasswordGenerated && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Generated Password:</Text>
              <Text style={styles.resultSubtitle}>Long press to copy</Text>
              <View style={styles.passwordBox}>
                <Text selectable style={styles.passwordText}>{password}</Text>
              </View>
            </View>
          )}

          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://github.com/saranzafar')}
            >
              <Text style={styles.footerText}>
                🚀 Created by
                <Text style={styles.githubLink}>@Saran Zafar</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollContent: {
    flexGrow: 1,
  },
  safeArea: {
    flex: 1,
  },
  mainContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 25,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
  },
  input: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    fontSize: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  optionsContainer: {
    marginBottom: 25,
  },
  optionsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#444',
    marginBottom: 15,
  },
  checkboxContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  checkboxWrapper: {
    width: '48%',
    marginBottom: 10,
  },
  checkboxText: {
    fontSize: 16,
    color: '#555',
    textDecorationLine: 'none',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    marginBottom: 25,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  generateButton: {
    backgroundColor: '#4CAF50',
  },
  resetButton: {
    backgroundColor: '#9E9E9E',
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  resultSubtitle: {
    fontSize: 12,
    color: '#888',
    marginBottom: 15,
  },
  passwordBox: {
    backgroundColor: '#F8F8F8',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  passwordText: {
    fontSize: 20,
    color: '#333',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  // Add these styles to your StyleSheet
  footer: {
    marginTop: 'auto',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
  githubLink: {
    color: '#2196F3',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default App;
