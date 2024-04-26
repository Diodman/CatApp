import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from './actions';

  const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (text) => {
    setLogin(text);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleLogin = () => {
    if (!login || !password) {
      Alert.alert('Ошибка', 'Введите логин и пароль');
      return;
    }

    const user = users.find(user => user.username === login);

    if (user) {
      dispatch(loginUser({ username: login, password }));
      navigation.navigate('CatFacts'); 
    } else {
      Alert.alert('Ошибка', 'Пользователь с таким логином не найден');
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
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
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
