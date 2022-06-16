import React, { useState } from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import CustomModal from "./CustomModal";

const Galery = ({ media }) => {
  return (
    <View>
      <Image
        source={{
          uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/logo.svg`,
        }}
        style={styles.logo}
      />
      <CustomModal />
    </View>
  );
};

export default Galery;

const styles = StyleSheet.create({
  button: {
    width: 170,
    height: 69,
    color: "#fff",
    backgroundColor: "#911c1c",
    borderRadius: 5,
    padding: 10,
    margin: 5,
    fontWeight: 700,
    fontSize: 20,
    lineHeight: 26,
    flex: 1,
    textAlign: "center",
  },
});
