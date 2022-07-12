import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import CardExtract from "../components/CardExtract";
import Tags from "../components/Tags";

const HomeScreen = () => {
  const photographers = useSelector((state) => state.data.photographers);
  const tags = useSelector((state) => state.data.tags);
  const currentTag = useSelector((state) => state.data.currentTag);
  const filteredPhotographersByTag =
    currentTag.length > 0
      ? photographers.filter((photographer) =>
          photographer.tags.includes(currentTag)
        )
      : photographers;
  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <Header />
        <View style={styles.row}>
          <Tags tags={tags} />
        </View>
        <View style={styles.row}>
          {filteredPhotographersByTag.map((photographer) => (
            <CardExtract key={photographer.id} photographer={photographer} />
          ))}
        </View>
      </View>
      <StatusBar style="auto" />
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
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});
