import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, ScrollView, View } from "react-native";
import React, { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Header from "../components/Header";
import Galery from "../components/Galery";

let data = require("../../data.json");
let dataPhotographers = data[0].photographers;
let media = data[0].media;

const PhotographScreen = ({ route }) => {
  const dataFilteredByID = dataPhotographers.filter(
    (item) => item.id == route.params.id
  );

  const mediaFilteredByID = media.filter(
    (item) => item.photographerId == route.params.id
  );

  console.log(mediaFilteredByID);

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <Header />
        <View style={styles.intro}>
          <Card dataPhotographers={dataFilteredByID} />
          <Button />
        </View>
        <Galery media={mediaFilteredByID} />
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
  intro: {
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    paddingBottom: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
