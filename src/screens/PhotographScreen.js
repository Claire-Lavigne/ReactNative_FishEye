import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import CardFull from "../components/CardFull";
import Galery from "../components/Galery";
import SmallModal from "../components/SmallModal";

const PhotographScreen = () => {
  return (
    <View style={styles.containerParent}>
      <ScrollView vertical>
        <View style={styles.container}>
          <View style={styles.intro}>
            <CardFull />
          </View>
          <View style={styles.gallery}>
            <Galery />
          </View>
          <StatusBar style="auto" />
        </View>
      </ScrollView>
      <View style={styles.bottom}>
        <SmallModal />
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
