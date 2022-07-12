import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "../components/Card";
import Galery from "../components/Galery";
import SmallModal from "../components/SmallModal";

const PhotographScreen = () => {
  const medias = useSelector((state) => state.data.allMedias);
  const photographers = useSelector((state) => state.data.allPhotographers);
  const photographerID = useSelector((state) => state.data.photographerID);

  console.log(photographers);

  const photographerName = photographers[0].name;

  const mediaFilteredByID = medias.filter(
    (item) => item.photographerId == photographerID
  );

  const arrayLikes = mediaFilteredByID.map((item) => item.likes);
  const totalLikes = arrayLikes.reduce((a, b) => a + b, 0);

  return (
    <View style={styles.containerParent}>
      <ScrollView vertical>
        <View style={styles.container}>
          <View style={styles.intro}>
            <Card
              filteredPhotographers={dataFilteredByID}
              displayTags={true}
              totalLikes={totalLikes}
            />
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
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    backgroundColor: "white",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: "flex-end",
  },
});
