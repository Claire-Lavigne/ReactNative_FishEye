import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";

const Galery = ({ media }) => {
  return media.map(
    (item) =>
      item.image !== undefined && (
        <View style={styles.mediaWrapper} key={`media-${item.id}`}>
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
