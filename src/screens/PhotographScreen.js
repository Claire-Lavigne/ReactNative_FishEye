import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CardFull from "../components/CardFull";
import Gallery from "../components/Gallery";
import SmallModal from "../components/SmallModal";
import Dropdown from "../components/Dropdown";
import useAxiosGet from "../useFetch";

const PhotographScreen = ({ route, navigation }) => {
  // filter photograph by ID from route params
  const { photograph } = route.params;
  /*
  const { data, error, loaded } = useAxiosPost(
    "/wp/v2/medias?acf_format=standard"
  );
  */
  // Get All Votes
  //const { data, error, loaded } = useAxiosPost("wp-ulike-pro/v1/vote");
  //console.log(data);
  // Get Single Vote
  // const { data, error, loaded } = useAxiosPost("wp-ulike-pro/v1/vote/1");

  return (
    <View style={styles.container}>
      <ScrollView vertical>
        <CardFull photograph={photograph} />
        {/*  <Dropdown /> */}
        <Gallery />
      </ScrollView>
      <View style={styles.form}>{/* <SmallModal />*/}</View>
    </View>
  );
};

export default PhotographScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
    textAlign: "center",
  },
  form: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: "flex-end",
  },
});
