import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Image, View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
    <View style={styles.content}>
      <Image
        style={styles.image}
        source={require('D:/AwesomeProject/image/cat1.jpg')} // Замените на путь к вашему изображению
        resizeMode="cover"
      />
      <Text style={styles.title}>Котики-обормотики!</Text>
      <Text style={styles.subtitle}>Самые милые котики только у нас.</Text>
    </View>
    <View style={styles.footer}>
      <View style={styles.menu}>
      <Button title="Войти" onPress={() => navigation.navigate('Login')} />
      <Button title="О нас" onPress={() => navigation.navigate('Me')} />
        <Button title="Главная страница" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
    <StatusBar style="auto" />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200EE',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#444444',
    textAlign: 'center',
  },
  footer: {
    backgroundColor: '#004080',
    paddingBottom: 20,
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  menuItem: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});

export default HomeScreen;