import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import users from './database';

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  
  const handleRegistration = () => {
    navigation.navigate('Register');
  };

  const handleLoginChange = (text) => {
    setLogin(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    // Поиск пользователя в базе данных по введенному логину
    const user = users.find((user) => user.username === login);

    // Если пользователь найден и его пароль совпадает, выводим сообщение о успешном входе
    if (user && user.password === password) {
      Alert.alert('Успешный вход', 'Вход выполнен успешно');
      navigation.navigate('CatFacts'); // Переход на страницу с фактами о котах
    } else {
      Alert.alert('Ошибка', 'Неверный логин или пароль');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Логин"
        onChangeText={handleLoginChange}
        value={login}
      />
      <TextInput
        style={styles.input}
        placeholder="Пароль"
        onChangeText={handlePasswordChange}
        value={password}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Вход</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleRegistration}>
        <Text style={styles.registerLink}>Нет аккаунта? Зарегистрироваться</Text>
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
  loginButton: {
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
  registerLink: {
    marginTop: 10,
    color: '#6200EE',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
