import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentData } from "../redux/dataSlice";
import Tags from "./Tags";

const CardExtract = ({ photographer }) => {
  const medias = useSelector((state) => state.data.medias);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const navigate = (photographer) => {
    const photographerMedias = medias.filter(
      (media) => media.photographerId === photographer.id
    );
    dispatch(setCurrentData({ photographer, photographerMedias }));
    navigation.navigate("Photograph");
  };
  return (
    <View style={styles.article}>
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigate(photographer)}
      >
        <Image
          source={{
            uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/Photographers_ID_Photos/${photographer.portrait}`,
          }}
          style={styles.image}
        />
        <Text style={styles.subtitle}>{photographer.name}</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.location}>
          {photographer.city}, {photographer.country}
        </Text>
        <Text style={styles.tagline}>{photographer.tagline}</Text>
        <Text style={styles.price}>{photographer.price}€/jour</Text>
      </View>
      <View style={styles.row}>
        <Tags tags={photographer.tags} />
      </View>
    </View>
  );
};

export default CardExtract;

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
