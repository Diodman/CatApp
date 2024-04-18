import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions, Share } from 'react-native';

const CatFactsScreen = () => {
  const [factImagePairs, setFactImagePairs] = useState([]);
  const [currentPairIndex, setCurrentPairIndex] = useState(0);

  useEffect(() => {
    fetchCatFactAndImage();
  }, []);

  const fetchCatFactAndImage = async () => {
    try {
      const factResponse = await fetch('https://catfact.ninja/fact');
      const factData = await factResponse.json();
      const newFact = factData.fact;

      const imageResponse = await fetch('https://api.thecatapi.com/v1/images/search');
      const imageData = await imageResponse.json();
      const imageUrl = imageData[0].url;

      const translatedFact = await translateFactToRussian(newFact);

      setFactImagePairs([...factImagePairs, { fact: translatedFact, image: imageUrl }]);
      setCurrentPairIndex(factImagePairs.length);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const translateFactToRussian = async (fact) => {
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${fact}&langpair=en|ru`);
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error('Error translating fact:', error);
      return fact;
    }
  };

  const handleNewFact = () => {
    fetchCatFactAndImage();
  };

  const handlePreviousFact = () => {
    if (currentPairIndex > 0) {
      setCurrentPairIndex(currentPairIndex - 1);
    }
  };

  const handleNextFact = () => {
    if (currentPairIndex < factImagePairs.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else {
      fetchCatFactAndImage();
    }
  };

  const handleShareFact = async () => {
    try {
      const factToShare = factImagePairs[currentPairIndex]?.fact || 'Check out this amazing cat fact!';
      await Share.share({
        message: factToShare,
      });
    } catch (error) {
      console.error('Error sharing fact:', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image source={{ uri: factImagePairs[currentPairIndex]?.image }} style={styles.catImage} />
        <Text style={styles.fact}>{factImagePairs[currentPairIndex]?.fact || 'Loading...'}</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handlePreviousFact}>
              <Text style={styles.buttonText}>Предыдущий факт</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNewFact}>
              <Text style={styles.buttonText}>Новый факт</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNextFact}>
              <Text style={styles.buttonText}>Следубщий факт</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.shareButton} onPress={handleShareFact}>
          <Text style={styles.shareButtonText}>Поделиться</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  catImage: {
    width: 250,
    height: 250,
    marginBottom: 20,
    borderRadius: 10,
  },
  fact: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    color: '#6200EE',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowWidth * 0.9,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#6200EE',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  shareButton: {
    backgroundColor: '#FF4081',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default CatFactsScreen;
