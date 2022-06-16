import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View } from "react-native";
import React, { useState } from "react";
import Header from "../components/Header";
import Card from "../components/Card";
import Tags from "../components/Tags";

const HomeScreen = () => {
  let data = require("../../data.json");
  let dataPhotographers = data[0].photographers;

  const [currentTag, setCurrentTag] = useState("");

  const dataTags = dataPhotographers.map((item) => item.tags);
  const mergeDeduplicate = (arr) => {
    return [...new Set([].concat(...arr))];
  };
  const uniqueTags = mergeDeduplicate(dataTags);
  const filterDataByTag = dataPhotographers.filter((item) =>
    item.tags.includes(currentTag)
  );

  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <Header />
        <View style={styles.horContainer}>
          <Tags tags={uniqueTags} setCurrentTag={setCurrentTag} />
        </View>
        <View style={styles.horContainer}>
          <Card
            dataPhotographers={
              filterDataByTag.length > 0 ? filterDataByTag : dataPhotographers
            }
            setCurrentTag={setCurrentTag}
            displayPrice={true}
            displayTags={true}
          />
        </View>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  horContainer: {
    flexFlow: "row wrap",
    justifyContent: "center",
  },
});
