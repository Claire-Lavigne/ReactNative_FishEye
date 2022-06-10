import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Tags = ({ tags, setCurrentTag }) => {
  return tags.map((tag) => (
    <TouchableOpacity
      key={tag}
      accessibilityLabel="Press to filter the photographers"
      style={styles.tagWrapper}
      onPress={() => {
        setCurrentTag(tag);
      }}
    >
      <Text style={styles.tag}>#{tag}</Text>
    </TouchableOpacity>
  ));
};

export default Tags;

const styles = StyleSheet.create({
  tagWrapper: {
    paddingHorizontal: 6,
    margin: 2,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#525252",
    borderRadius: 11,
    width: "fit-content",
  },
  tag: {
    color: "#901c1c",
    fontSize: 12,
    fontWeight: 500,
    textAlign: "center",
    textTransform: "capitalize",
  },
});
