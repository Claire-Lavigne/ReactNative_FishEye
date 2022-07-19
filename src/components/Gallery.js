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
  const photographerMedias = useSelector((state) => state.data.mediaByID);

  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  let lastTap = null;

  const handleDoubleTap = (media, i) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      if (!isLiked) {
        setIsLiked(true);
        dispatch(setCurrentMedias(media[i].likes++));
      } else {
        setIsLiked(false);
        dispatch(setCurrentMedias(media[i].likes--));
      }
    } else {
      lastTap = now;
    }
  };
  return photographerMedias.map((media, i) => {
    <TouchableOpacity
      style={styles.card}
      key={media.id}
      onPress={() => handleDoubleTap(media, i)}
    >
      <View style={styles.imageWrapper}>
        <ImageBackground
          resizeMode="cover"
          source={{
            uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/${media.photographerId}/${media.image}`,
          }}
          style={styles.image}
        >
          {isLiked && (
            <Image
              resizeMode="cover"
              source={{
                uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/heart.png`,
              }}
              style={styles.heartIcon}
            />
          )}
        </ImageBackground>
      </View>
      <View style={styles.description}>
        <Text>{media.alt}</Text>
        <Text>{media.likes}</Text>
      </View>
    </TouchableOpacity>;
  });
};

export default Gallery;

const styles = StyleSheet.create({
  card: {
    width: 350,
    height: 300,
    alignItems: "center",
    paddingVertical: 15,
  },
  imageWrapper: {
    flex: 1,
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
    width: 50,
    height: 50,
    opacity: 0.8,
  },
  description: {
    width: 350,
    color: "#fff",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
