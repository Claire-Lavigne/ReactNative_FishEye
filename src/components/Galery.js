import React from "react";
import { StyleSheet, FlatList, Image, Text, View } from "react-native";

const Galery = ({ media }) => {
  return (
    <View style={styles.galery}>
      <FlatList
        data={media}
        renderItem={(item) => {
          item.image !== undefined ? (
            <View style={styles.row} key={`img-${item.id}`}>
              <Image
                source={{
                  uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/${item.photographerId}/${item.image}`,
                }}
                style={styles.image}
              />
              <Text>{item.alt}</Text>
              <Text>{item.likes}</Text>
            </View>
          ) : (
            <View style={styles.row} key={`img-${item.id}`}>
              <Text>{item.likes}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Galery;

const styles = StyleSheet.create({
  galery: {
    flex: 1,
  },
  row: {
    backgroundColor: "red",
    height: 300,
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  image: {
    width: 350,
    height: 300,
    color: "#fff",
    backgroundColor: "#C4C4C4",
    borderRadius: 5,
    margin: 30,
  },
});
