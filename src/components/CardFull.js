import React from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Tags from "./Tags";

const CardFull = () => {
  const photographer = useSelector((state) => state.data.photographers);
  const photographerMedias = useSelector((state) => state.data.medias);
  const likes = photographerMedias.map((media) => media.likes);
  const totalLikes = likes.reduce((a, b) => a + b, 0);
  return (
    <View style={styles.article}>
      <View style={styles.link}>
        <Image
          source={{
            uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/Photographers_ID_Photos/${photographer.portrait}`,
          }}
          style={styles.image}
        />
        <Text style={styles.subtitle}>{photographer.name}</Text>
      </View>
      <View>
        <Text style={styles.location}>
          {photographer.city}, {photographer.country}
        </Text>
        <Text style={styles.tagline}>{photographer.tagline}</Text>
      </View>
      <View style={styles.row}>
        <Tags tags={photographer.tags} />
      </View>
      <View style={styles.row}>
        <View style={styles.row}>
          <Text style={styles.likes}>{totalLikes}</Text>
          <Image
            resizeMode="cover"
            source={{
              uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/heart.png`,
            }}
            style={styles.heartIcon}
          />
        </View>
        <Text style={styles.price}>{photographer.price}€/jour</Text>
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
    fontSize: 13,
    marginBottom: 6,
    textAlign: "center",
  },
  tagline: {
    color: "#000",
    fontSize: 10,
    marginBottom: 5,
    textAlign: "center",
  },
  price: {
    color: "#525252",
    fontSize: 9,
    marginBottom: 4,
    textAlign: "center",
  },
  heartIcon: {
    width: 50,
    height: 50,
    opacity: 0.8,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
