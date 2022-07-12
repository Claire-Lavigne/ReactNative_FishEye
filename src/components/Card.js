import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setPhotographerID, setCurrentPhotographer } from "../redux/dataSlice";
import Tags from "./Tags";

const Card = ({ displayTags, displayPrice, totalLikes, item }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const navigate = (item) => {
    // dispatch(setPhotographerID(item.id));
    // dispatch(setCurrentPhotographer(item));
    // add id in nav
    navigation.navigate("Photograph");
    // dispatch after
  };
  return (
    <View style={styles.article}>
      <TouchableOpacity style={styles.link} onPress={() => navigate(item)}>
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
        {displayPrice && <Text style={styles.price}>{item.price}€/jour</Text>}
      </View>
      {displayTags && (
        <View style={styles.row}>
          <Tags tags={item.tags} />
        </View>
      )}
      {totalLikes && (
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
          <Text style={styles.price}>{item.price}€/jour</Text>
        </View>
      )}
    </View>
  );
};

export default Card;

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
