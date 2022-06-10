import React, { useState } from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Tags from "./Tags";

const Card = ({ dataPhotographers, setCurrentTag }) => {
  const navigation = useNavigation();

  return dataPhotographers.map((item) => (
    <View
      style={styles.article}
      key={`card-${item.id}`}
      classname={`tag ${item.tags.join(" ")}`}
    >
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Photograph", { id: item.id })}
      >
        <Image
          source={{
            uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/Photographers_ID_Photos/${item.portrait}`,
          }}
          style={styles.image}
        />
        <Text style={styles.subtitle}>{item.name}</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.location}>
          {item.city}, {item.country}
        </Text>
        <Text style={styles.tagline}>{item.tagline}</Text>
        <Text style={styles.price}>{item.price}€/jour</Text>
      </View>
      <View style={styles.horContainer}>
        <Tags tags={item.tags} setCurrentTag={setCurrentTag} />
      </View>
    </View>
  ));
};

export default Card;

const styles = StyleSheet.create({
  horContainer: {
    flexFlow: "row wrap",
    justifyContent: "center",
  },
  article: {
    padding: 40,
    textAlign: "center",
  },
  link: {
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    borderRadius: "50%",
    marginBottom: 16,
    width: 200,
    height: 200,
  },
  subtitle: {
    color: "#d35735",
    fontSize: 36,
    marginBottom: 6,
  },
  location: {
    color: "#901c1c",
    fontSize: 13,
    marginBottom: 6,
  },
  tagline: {
    color: "#000",
    fontSize: 10,
    marginBottom: 5,
  },
  price: {
    color: "#525252",
    fontSize: 9,
    marginBottom: 4,
  },
});
