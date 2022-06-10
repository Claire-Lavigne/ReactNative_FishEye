import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, ScrollView, View } from "react-native";
import React, { useState } from "react";
import Card from "../components/Card";

let data = require("../../data.json");
let dataPhotographers = data[0].photographers;
let media = data[0].media;

const PhotographScreen = ({ route }) => {
  const dataFilteredByID = dataPhotographers.filter(
    (item) => item.id == route.params.id
  );

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <Text style={styles.title}>Photographer</Text>
        <Card dataPhotographers={dataFilteredByID} />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

export default PhotographScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
