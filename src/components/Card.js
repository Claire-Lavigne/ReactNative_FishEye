import React from "react";
import { StyleSheet, Image, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Tags from "./Tags";

const Card = ({ dataPhotographers }) => {
  const navigation = useNavigation();
  console.log(dataPhotographers);

  return dataPhotographers.map((item) => (
    <View key={`card-${item.id}`} className={item.tags.join(" ")}>
      {console.log(
        `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/Photographers_ID_Photos/${item.portrait}`
      )}
      <TouchableOpacity
        style={styles.link}
        onPress={() => navigation.navigate("Photograph")}
        // href={`/photographer.html?id=${item.id}`}
        //  aria-label={item.name}
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
      <View className="tags-container">
        <View style={styles.list}>
          <Tags tags={item.tags} />
        </View>
      </View>
    </View>
  ));
};

export default Card;

const styles = StyleSheet.create({
  link: {
    textDecorationLine: "none",
  },
  image: {
    resizeMode: "cover",
    borderRadius: "50%",
    marginBottom: 16,
    width: 100,
    height: 100,
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
  list: {
    flex: 1,
    flexFlow: "row wrap",
    justifyContent: "center",
    listStyle: "none",
  },
});
