import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Tag from "./Tag";

const CardFull = ({ photograph }) => {
  // const photographerMedias = useSelector((state) => state.data.medias);
  // const likes = photographerMedias.map((media) => media.likes);
  //const totalLikes = likes.reduce((a, b) => a + b, 0);
  return (
    <View style={styles.article}>
      <View style={styles.link}>
        <Image
          source={{
            uri: photograph.image
              ? photograph.image
              : `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/mysterious-person.svg`,
          }}
          style={styles.image}
        />
        <Text style={styles.subtitle}>
          {photograph.firstname} {photograph.lastname}
        </Text>
      </View>
      <View>
        <Text style={styles.location}>
          {photograph.city}, {photograph.country}
        </Text>
        <Text style={styles.tagline}>{photograph.tagline}</Text>
      </View>
      <View style={styles.row}>
        <Tag tag={photograph.tags} />
      </View>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.likes}>{/*totalLikes*/}</Text>
          <Image
            resizeMode="cover"
            source={{
              uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/heart.png`,
            }}
            style={styles.heartIcon}
          />
        </View>
        <Text style={styles.price}>{photograph.price}€/jour</Text>
      </View>
    </View>
  );
};

export default CardFull;

const styles = StyleSheet.create({
  article: {
    padding: 40,
  },
  link: {
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    borderRadius: 100,
    marginBottom: 16,
    width: 200,
    height: 200,
  },
  subtitle: {
    color: "#d35735",
    fontSize: 36,
    marginBottom: 6,
    textAlign: "center",
  },
  location: {
    color: "#901c1c",
    fontSize: 20,
    marginBottom: 6,
    textAlign: "center",
  },
  tagline: {
    color: "#000",
    fontSize: 18,
    marginBottom: 5,
    textAlign: "center",
  },
  likes: {
    fontSize: 20,
    marginRight: 5,
    color: "#CD232E",
    fontWeight: "bold",
  },
  heartIcon: {
    width: 20,
    height: 20,
    opacity: 1,
  },
  price: {
    fontSize: 16,
    textAlign: "center",
    marginLeft: 8,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
});
