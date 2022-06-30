import React, { useState } from "react";
import {
  StyleSheet,
  Image,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const Galery = ({ media }) => {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    console.log("before", liked);
    setLiked(!liked);
    console.log("after", liked);
  };
  let lastTap = null;

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTap && now - lastTap < DOUBLE_PRESS_DELAY) {
      toggleLike();
    } else {
      lastTap = now;
    }
  };

  return media.map(
    (item) =>
      item.image !== undefined && (
        <TouchableWithoutFeedback
          key={`media-${item.id}`}
          onPress={() => handleDoubleTap()}
        >
          <View style={styles.mediaWrapper}>
            <Image
              source={{
                uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/${item.photographerId}/${item.image}`,
              }}
              style={styles.media}
            />
            <View style={styles.description}>
              <Text>{item.alt}</Text>
              <Text>{item.likes}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )
  );
};

export default Galery;

const styles = StyleSheet.create({
  mediaWrapper: {
    maxWidth: 350,
    marginHorizontal: 47.5,
    marginVertical: 15,
  },
  media: {
    width: 350,
    height: 300,
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
  },
  description: {
    color: "#fff",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
