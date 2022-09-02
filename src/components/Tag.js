import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const Tag = ({ tag, index }) => {
  const myRefs = React.useRef([]);

  const setSelected = (index) => {
    myRefs.current.forEach((ref) =>
      ref.setNativeProps({
        style: { backgroundColor: "transparent", color: "#901c1c" },
      })
    );
    myRefs.current[index].setNativeProps({
      style: { backgroundColor: "#901c1c", color: "white" },
    });
  };

  return (
    <TouchableOpacity
      accessibilityLabel="Press to filter the photographers by tag"
      style={styles.tagWrapper}
      onPress={() => setSelected(index)}
    >
      <Text ref={(el) => (myRefs.current[index] = el)} style={styles.tag}>
        #{tag}
      </Text>
    </TouchableOpacity>
  );
};

export default Tag;

const styles = StyleSheet.create({
  tagWrapper: {
    marginHorizontal: 2,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  tag: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#525252",
    borderRadius: 11,
    paddingHorizontal: 6,
    color: "#901c1c",
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
