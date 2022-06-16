import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Image, TouchableOpacity } from "react-native";
import React from "react";

const Header = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.link}
      onPress={() => navigation.navigate("Nos photographes")}
    >
      <Image
        source={{
          uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/logo.svg`,
        }}
        style={styles.logo}
      />
    </TouchableOpacity>
  );
};

export default Header;

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 37,
    float: "left",
    padding: 16,
    margin: 10,
  },
});
