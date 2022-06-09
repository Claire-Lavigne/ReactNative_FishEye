import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Tags = ({ tags }) => {
  return tags.map((tag, index) => (
    <TouchableOpacity key={`tag-${index}`} style={styles.tagWrapper}>
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
  },
  tag: {
    color: "#901c1c",
    fontSize: 12,
    fontWeight: 500,
    textTransform: "capitalize",
  },
});
