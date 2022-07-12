import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import Card from "../components/Card";
import Tags from "../components/Tags";

const HomeScreen = () => {
  const photographers = useSelector((state) => state.data.allPhotographers);
  const tags = useSelector((state) => state.data.tags);
  const currentTag = useSelector((state) => state.data.currentTag);
  const filteredPhotographers =
    currentTag.length > 0
      ? photographers.filter((item) => item.tags.includes(currentTag))
      : photographers;
  return (
    <ScrollView vertical>
      <View style={styles.container}>
        <Header />
        <View style={styles.row}>
          <Tags tags={tags} />
        </View>
        <View style={styles.row}>
          {filteredPhotographers.map((item) => (
            <Card
              displayPrice={true}
              displayTags={true}
              key={`card-${item.id}`}
              item={item}
            />
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
