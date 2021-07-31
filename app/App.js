import React, {useEffect, useState, useRef} from 'react';
import {
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

const API_KEY = '563492ad6f91700001000001427e6133aba9431fbae90869e4c8400e';
const API_URL =
  'https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20';
const IMAGE_SIZE = 80;
const SPACING = 10;

const fetchImagesFromPexels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      Authorization: API_KEY,
    },
  });
  // const results = await data.json();
  const {photos} = await data.json();

  return photos;
};

export default () => {
  const [images, setImages] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      const data = await fetchImagesFromPexels();
      setImages(data);
    };
    fetchImages();
  }, []);

  // ============================

  const topRef = useRef();
  const thumbRef = useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = index => {
    // setIndex with the index
    setActiveIndex(index);

    // scroll FlatLists
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    // si los thumb pasan la mitad de la pantalla, que los muestre
    if (index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };
  if (!images) {
    return <Text>Loading...</Text>;
  }
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <FlatList
        ref={topRef}
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={ev =>
          scrollToActiveIndex(
            Math.floor(ev.nativeEvent.contentOffset.x / width),
          )
        }
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View style={{width, height}}>
              <Image
                source={{uri: item.src.portrait}}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id.toString()}
        style={{position: 'absolute', bottom: 10}}
        contentContainerStyle={{padding: SPACING}}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
              <Image
                source={{uri: item.src.portrait}}
                style={{
                  width: IMAGE_SIZE,
                  height: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 3,
                  borderColor: activeIndex === index ? '#fff' : 'transparent',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
