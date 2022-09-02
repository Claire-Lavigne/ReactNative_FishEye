import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import Header from "../components/Header";
import CardExtract from "../components/CardExtract";
import Tag from "../components/Tag.js";
import useAxiosGet from "../useFetch";

const HomeScreen = () => {
  let baseURL = "https://quiero-web.com/claire-p6-backend";
  // 1st param = acf fields + author id
  // 2nd param = get image urls, array or id from acf
  let profilURL = `${baseURL}/wp-json/wp/v2/profil?_fields=author,acf&acf_format=standard`;

  // fetching data
  const {
    data: photographersData,
    loading: photographersLoading,
    error: photographersError,
  } = useAxiosGet(profilURL);

  // ordering data
  const photographers = photographersData.map((data) => {
    return {
      authorID: data.author,
      firstname: data.acf.firstname,
      lastname: data.acf.lastname,
      price: data.acf.price,
      tagline: data.acf.tagline,
      city: data.acf.city,
      country: data.acf.country,
      image: data.acf.image,
    };
  });

  let DATA;

  if (photographersLoading) {
    DATA = <Text>Loading...</Text>;
  }
  if (photographersError) {
    DATA = <Text>{error}</Text>;
  }

  if (!photographersLoading && !photographersError) {
    DATA = (
      <ScrollView vertical>
        <View style={styles.container}>
          <Header />
          <View style={styles.row}>
            {/* tags?.map((tag) => (
              <Tag key={tag.id} index={tag.id} tag={tag.slug} />
            )) */}
          </View>
          <View style={styles.row}>
            {photographers?.map((photographer) => (
              <CardExtract
                key={photographer.authorID}
                id={photographer.authorID}
                photographer={photographer}
              />
            ))}
          </View>
        </View>
        <StatusBar style="auto" />
      </ScrollView>
    );
  }

  return <View>{DATA}</View>;
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
