import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import CardFull from "../components/CardFull";
import Gallery from "../components/Gallery";
import SmallModal from "../components/SmallModal";
import Dropdown from "../components/Dropdown";

const PhotographScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView vertical>
        <CardFull />
        <Dropdown />
        <Gallery />
      </ScrollView>
      <View style={styles.form}>
        <SmallModal />
      </View>
    </View>
  );
};

export default PhotographScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    textAlign: "center",
  },
  form: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: "flex-end",
  },
});
