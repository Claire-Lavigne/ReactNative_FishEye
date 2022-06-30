import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import Card from "../components/Card";
import Galery from "../components/Galery";
import SmallModal from "../components/SmallModal";

let data = require("../../data.json");
let dataPhotographers = data[0].photographers;
let media = data[0].media;

const PhotographScreen = ({ route }) => {
  const dataFilteredByID = dataPhotographers.filter(
    (item) => item.id == route.params.id
  );

  const photographerName = dataFilteredByID[0].name;

  const mediaFilteredByID = media.filter(
    (item) => item.photographerId == route.params.id
  );

  return (
    <View style={styles.containerParent}>
      <ScrollView vertical>
        <View style={styles.container}>
          <View style={styles.intro}>
            <Card dataPhotographers={dataFilteredByID} />
          </View>
          <View style={styles.gallery}>
            <Galery media={mediaFilteredByID} />
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <SmallModal photographerName={photographerName} />
      </View>
    </View>
  );
};

export default PhotographScreen;

const styles = StyleSheet.create({
  containerParent: {
    flex: 1,
    position: "relative",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  intro: {
    flex: 1,
    textAlign: "center",
    borderRadius: 5,
    paddingBottom: 30,
  },
  gallery: {
    flex: 2,
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: "flex-end",
  },
});
