import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentTag } from "../redux/dataSlice";
import { Dropdown } from "react-native-element-dropdown";
import { DownOutlined } from "@ant-design/icons";

let dropdownData = [
  { label: "Popularité", value: "likes" },
  { label: "Date", value: "date" },
  { label: "Titre", value: "alt" },
];

const DropdownComponent = (media) => {
  const [value, setValue] = useState("likes");
  const [isFocus, setIsFocus] = useState(false);

  //const sortedMedia = media.sort((a, b) => a.dropdownValue - b.dropdownValue);
  //console.log(sortedMedia);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: "#d35735" }]}>
          Trier par
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: "#d35735" }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={dropdownData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Trier par"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          setIsFocus(false);
          dispatch(sortMediasBy(item.value));
        }}
        renderRightIcon={() => <DownOutlined style={styles.icon} />}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
    marginVertical: 20,
  },
  dropdown: {
    width: 200,
    height: 50,
    borderColor: "grey",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
    fontSize: 20,
    color: "#black",
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});
