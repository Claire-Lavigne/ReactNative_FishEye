import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMedias } from "../redux/dataSlice";
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";

const Gallery = () => {
  const images = useSelector((state) => state.data.mediaByID);
  const [isLiked, setIsLiked] = useState(false);
  const dispatch = useDispatch();

  const handleLikes = (id) => {
    const newState = images.map((obj) => {
      // update current obj
      if (obj.id === id) {
        // add likes
        setIsLiked(!isLiked);
        console.log({ ...obj, isLiked: isLiked });
        return { ...obj, isLiked: isLiked };
      }
      // otherwise return object as is
      return obj;
    });
    console.log(newState);
    dispatch(setCurrentMedias(newState));
  };

  return (
    <View>
      <FlatList
        keyExtractor={(item) => item.id}
        horizontal={false}
        numColumns={images.length}
        columnWrapperStyle={styles.flatList}
        data={images}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.imageWrapper}>
              <ImageBackground
                resizeMode="cover"
                source={{
                  uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/${item.photographerId}/${item.image}`,
                }}
                style={styles.image}
              ></ImageBackground>
            </View>
            <View style={styles.description}>
              <Text>{item.alt}</Text>
              <Text>{item.likes}</Text>
              <TouchableOpacity onPress={() => handleLikes(item.id)}>
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
