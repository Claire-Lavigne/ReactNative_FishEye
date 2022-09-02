import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPhotographer, setCurrentMedias } from "../redux/dataSlice";
import { getPhotographers } from "../features/photographersSlice";
import Tag from "./Tag.js";

const CardExtract = ({ id, photographer }) => {
  const navigation = useNavigation();
  // const dispatch = useDispatch();

  // const { photographerID } = useSelector((state) => state.photographers);

  const navigate = (id) => {
    /*
    const photographerMedias = medias.filter((media) => {
      console.log(media);
      media.image !== undefined && media.photographerId === id;
    });
    */
    // dispatch(getPhotographers({ photographerID: id }));
    // dispatch(getMedias(photographerMedias));
    navigation.navigate("Photograph", { photograph: photographer });
  };
  return (
    <View style={styles.article}>
      <TouchableOpacity style={styles.link} onPress={() => navigate(id)}>
        <Image
          source={{
            uri: photographer.image
              ? photographer.image
              : `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/mysterious-person.svg`,
          }}
          style={styles.image}
        />
        <Text
          style={styles.subtitle}
        >{`${photographer.firstname} ${photographer.lastname}`}</Text>
      </TouchableOpacity>
      <View>
        <Text style={styles.location}>
          {photographer.city}, {photographer.country}
        </Text>
        <Text style={styles.tagline}>{photographer.tagline}</Text>
        <Text style={styles.price}>{photographer.price}€/jour</Text>
      </View>
      <View style={styles.row}>
        <Tag tag={"todo"} />
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
