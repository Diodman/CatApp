import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { registerUser } from './reducers';

const RegistrationScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (text) => {
    setUsername(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleRegistration = () => {
    const newUser = { id: Math.random().toString(), username, password };
    dispatch(registerUser(newUser));
    Alert.alert('Успешная регистрация', 'Аккаунт зарегистрирован успешно');
    navigation.navigate('CatFacts'); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Логин"
        onChangeText={handleUsernameChange}
        value={username}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.registerButton} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Зарегистрироваться</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginLink}>Уже есть аккаунт? Войти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#6200EE',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 300,
  },
  registerButton: {
    backgroundColor: '#6200EE',
    borderRadius: 5,
    padding: 10,
    width: 300,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    marginTop: 10,
    color: '#6200EE',
    textDecorationLine: 'underline',
  },
});


export default RegistrationScreen;
