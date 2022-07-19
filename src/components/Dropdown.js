import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMedias } from "../redux/dataSlice";

let dropdownData = [
  { label: "Popularité", value: "likes" },
  { label: "Date", value: "date" },
  { label: "Titre", value: "title" },
];

const DropdownComponent = () => {
  const photographerMedias = useSelector((state) => state.data.mediaByID);
  const dispatch = useDispatch();
  const [value, setValue] = useState("title");
  const [isFocus, setIsFocus] = useState(false);

  const sortMedias = (item) => {
    console.log(item);
    let sortedMedias = [];
    switch (item.value) {
      case "title":
        sortedMedias = [...photographerMedias].sort((a, b) =>
          a.alt.localeCompare(b.alt, "en", {
            ignorePunctuation: true,
            sensitivity: "base",
          })
        );
        break;
      case "date":
        sortedMedias = [...photographerMedias].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() // Timestamp
        );
        break;
      case "likes":
        sortedMedias = [...photographerMedias].sort(
          (a, b) => b.likes - a.likes
        );
        break;
      default:
        sortedMedias = [...photographerMedias];
        break;
    }
    dispatch(setCurrentMedias(sortedMedias));
  };

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
          sortMedias(item);
        }}
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
