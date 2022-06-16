import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Button = () => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={() => console.log("openform")}
    >
      <Text>Contactez-moi</Text>
    </TouchableOpacity>
  );
};

export default Button;

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
