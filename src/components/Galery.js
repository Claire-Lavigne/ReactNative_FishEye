import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Dropdown from "../components/Dropdown";

const Galery = ({ media }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [countLikes, setCountLikes] = useState(0);

  let lastTap = null;

  const handleLike = () => {
    if (!isLiked) {
      setIsLiked(true);
      setCountLikes(countLikes + 1);
    } else {
      setIsLiked(false);
      setCountLikes(countLikes - 1);
    }
  };

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      handleLike();
    } else {
      lastTap = now;
    }
  };

  return (
    <>
      {/* <Dropdown media={media} /> */}
      {media.map((item, i) => {
        item.image !== undefined && (
          <TouchableWithoutFeedback
            key={`media-${item.id}`}
            onPress={() => handleDoubleTap()}
          >
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <ImageBackground
                  resizeMode="cover"
                  source={{
                    uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/${item.photographerId}/${item.image}`,
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
                <Text>{item.alt}</Text>
                <Text>{countLikes}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
        );
      })}
      ;
    </>
  );
};

export default Galery;

const styles = StyleSheet.create({
  card: {
    width: "100%",
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
