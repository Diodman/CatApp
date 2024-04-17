import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';

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

      const translatedFact = await translateFactToRussian(newFact); // Переводим факт на русский язык

      // Добавляем новую пару "факт - картинка" к массиву
      setFactImagePairs([...factImagePairs, { fact: translatedFact, image: imageUrl }]);
      // Устанавливаем текущий индекс на последний элемент массива
      setCurrentPairIndex(factImagePairs.length);
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
    }
  };

  const translateFactToRussian = async (fact) => {
    try {
      const response = await fetch(`https://api.mymemory.translated.net/get?q=${fact}&langpair=en|ru`);
      const data = await response.json();
      return data.responseData.translatedText;
    } catch (error) {
      console.error('Ошибка при переводе факта:', error);
      return fact; // Возвращаем исходный текст факта в случае ошибки
    }
  };

  const handleNewFact = () => {
    fetchCatFactAndImage();
  };

  const handlePreviousFact = () => {
    // Если текущий индекс больше 0, уменьшаем его на 1
    if (currentPairIndex > 0) {
      setCurrentPairIndex(currentPairIndex - 1);
    }
  };

  const handleNextFact = () => {
    // Если текущий индекс меньше длины массива минус 1, увеличиваем его на 1
    if (currentPairIndex < factImagePairs.length - 1) {
      setCurrentPairIndex(currentPairIndex + 1);
    } else {
      // Если текущий индекс равен длине массива минус 1, загружаем новый факт и картинку
      fetchCatFactAndImage();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Image source={{ uri: factImagePairs[currentPairIndex]?.image }} style={styles.catImage} />
        <Text style={styles.fact}>{factImagePairs[currentPairIndex]?.fact || 'Загрузка...'}</Text>
        <Button title="Предыдущий факт" onPress={handlePreviousFact} style={styles.button} />
          <Button title="Новый факт" onPress={handleNewFact} style={styles.button}/>
          <Button title="Следующий факт" onPress={handleNextFact} style={styles.button}/>
      </ScrollView>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catImage: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  fact: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: windowWidth * 0.4, // 90% ширины экрана
    marginBottom: 20,
    marginHorizontal: 80, 
    paddingHorizontal: 10,// Горизонтальный отступ между кнопками
  },
  button: {
    paddingHorizontal: 60, // Горизонтальный внешний отступ кнопок
  },
});

export default CatFactsScreen;
