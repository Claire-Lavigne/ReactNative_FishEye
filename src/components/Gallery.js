import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMedias } from "../redux/dataSlice";
import { Dimensions } from "react-native";
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";

const Gallery = ({ medias }) => {
  const windowWidth = Dimensions.get("window").width;
  console.log(windowWidth);

  let numColumns = 1;

  if (windowWidth < 720) {
    numColumns = 1;
  } else if (windowWidth < 1080) {
    numColumns = 2;
  } else {
    numColumns = 3;
  }

  console.log(medias.length);
  /*
  const images = useSelector((state) => state.data.medias);
  const [isLiked, setIsLiked] = useState(true);
  const dispatch = useDispatch();

  const handleLikes = (id) => {
    const newState = medias.map((obj) => {
      // update current obj
      if (obj.id === id) {
        setIsLiked(!isLiked);
        if (isLiked) {
          return { ...obj, likes: obj.likes + 1, isLiked: isLiked };
        } else {
          return { ...obj, likes: obj.likes - 1, isLiked: isLiked };
        }
      }
      // otherwise return object as is
      return obj;
    });
    console.log(newState);
    dispatch(setCurrentMedias(newState));
  };
  */
  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.imgID}
        horizontal={false}
        numColumns={numColumns}
        columnWrapperStyle={styles.flatList}
        data={medias}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageWrapper}>
              <ImageBackground
                resizeMode="cover"
                source={{
                  uri: item.image,
                }}
                style={styles.image}
              ></ImageBackground>
            </View>
            <View style={styles.description}>
              <Text>{item.title}</Text>
              <Text>{/*item.likes*/}</Text>
              <TouchableOpacity onPress={() => handleLikes(item.imgID)}>
                <Image
                  resizeMode="cover"
                  source={
                    item.isLiked
                      ? {
                          uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/heart.png`,
                        }
                      : {
                          uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/heart-outline.png`,
                        }
                  }
                  style={styles.heartIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  flatList: {
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    paddingVertical: 15,
  },
  imageWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  image: {
    width: 350,
    height: 300,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  heartIcon: {
    width: 20,
    height: 20,
    opacity: 0.8,
  },
  description: {
    width: 350,
    color: "#fff",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
