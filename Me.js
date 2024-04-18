import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image, View, Text, Linking } from 'react-native';

const MeScreen = ({ navigation }) => {
  const handleContacts = () => {
    Linking.openURL('https://vk.com/tdaniilandreevich');
  };

  const handleTG = () => {
    Linking.openURL('https://t.me/Diodman');
  };

  const handleSecondDevContacts = () => {
    Linking.openURL('https://vk.com/w0nder_0f_y0u');
  };

  const handleSecondDevTG = () => {
    Linking.openURL('https://t.me/backendstreet');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require('D:/AwesomeProject/image/me.jpg')}
            resizeMode="cover"
          />
          <Text style={styles.title}>Привет, я Даниил!</Text>
          <Text style={styles.subtitle}>Для связи со мной:</Text>
          <View style={styles.contactGroup}>
            <TouchableOpacity style={styles.linkButton} onPress={handleContacts}>
              <Text style={styles.buttonText}>VK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onPress={handleTG}>
              <Text style={styles.buttonText}>Telegram</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <View style={styles.content}>
          <Image
            style={styles.image}
            source={require('D:/AwesomeProject/image/artem.jpg')}
            resizeMode="cover"
          />
          <Text style={styles.title}>Привет, я Артем!</Text>
          <Text style={styles.subtitle}>Для связи со мной:</Text>
          <View style={styles.contactGroup}>
            <TouchableOpacity style={styles.linkButton} onPress={handleSecondDevContacts}>
              <Text style={styles.buttonText}>VK</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkButton} onPress={handleSecondDevTG}>
              <Text style={styles.buttonText}>Telegram</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  card: {
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200EE',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#444444',
    textAlign: 'center',
    marginBottom: 16,
  },
  contactGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 8,
  },
  linkButton: {
    backgroundColor: '#6200EE',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MeScreen;
