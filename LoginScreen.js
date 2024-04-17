// LoginScreen.js
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
import users from './database'; // Импортируем базу данных

const LoginScreen = ({ navigation }) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

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
      <Button title="Вход" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    width: 300,
  },
});

export default LoginScreen;
