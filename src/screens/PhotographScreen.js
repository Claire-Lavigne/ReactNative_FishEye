import React from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";
import { useSelector } from "react-redux";
import CardFull from "../components/CardFull";
import Gallery from "../components/Gallery";
import SmallModal from "../components/SmallModal";
import Dropdown from "../components/Dropdown";
import useAxiosGet from "../useFetch";

const PhotographScreen = ({ route }) => {
  // filter photograph by ID from route params
  const { photograph } = route.params;
  let baseURL = "https://quiero-web.com/claire-p6-backend";
  // 1st param = acf fields + author id
  // 2nd param = get image urls, array or id from acf
  let profilURL = `${baseURL}/wp-json/wp/v2/medias?acf_format=standard`;

  // fetching data
  const {
    data: mediasData,
    loading: mediasLoading,
    error: mediasError,
  } = useAxiosGet(profilURL);

  // Get All Votes
  //const { data, error, loaded } = useAxiosPost("wp-ulike-pro/v1/vote");
  //console.log(data);
  // Get Single Vote
  // const { data, error, loaded } = useAxiosPost("wp-ulike-pro/v1/vote/1");

  // ordering data
  const medias = mediasData.map((data) => {
    return {
      authorID: data.author,
      imgID: data.id,
      date: data.date,
      tags: data.acf.tags[0].slug,
      title: data.title.rendered,
      image: data.acf.media,
      price: data.acf.price,
    };
  });

  let DATA;

  if (mediasLoading) {
    DATA = <Text>Loading...</Text>;
  }
  if (mediasError) {
    DATA = <Text>{error}</Text>;
  }

  if (!mediasLoading && !mediasError) {
    console.log(medias, medias.length, photograph.authorID);
    const filteredMedias =
      medias.length > 0
        ? medias.filter((media) => media.authorID == photograph.authorID)
        : [];
    console.log(filteredMedias);

    DATA = (
      <View style={styles.container}>
        <ScrollView vertical>
          <CardFull photograph={photograph} />
          {/*  <Dropdown /> */}
          <Gallery medias={filteredMedias} />
        </ScrollView>
        <View style={styles.form}>
          <SmallModal name={`${photograph.firstname} ${photograph.lastname}`} />
        </View>
      </View>
    );
  }

  return <View>{DATA}</View>;
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
