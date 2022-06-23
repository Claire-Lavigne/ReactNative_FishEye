import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, Image, ScrollView, View } from "react-native";
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
    <ScrollView vertical>
      <View style={styles.container}>
        <View style={styles.intro}>
          <Card dataPhotographers={dataFilteredByID} />
          <SmallModal
            buttonContent="Contactez-moi"
            photographerName={photographerName}
          />
        </View>
        <Galery style={styles.galery} media={mediaFilteredByID} />
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

export default PhotographScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  intro: {
    textAlign: "center",
    borderRadius: 5,
    paddingBottom: 30,
    flex: 1,
  },
  galery: {
    backgroundColor: "red",
    flex: 1,
  },
});
