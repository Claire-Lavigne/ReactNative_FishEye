import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentMedias } from "../redux/dataSlice";
import {
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  View,
} from "react-native";
import useAxiosGet from "../useFetch";

const Gallery = () => {
  let baseURL = "https://quiero-web.com/claire-p6-backend";
  // 1st param = acf fields + uthor id + media title
  // 2nd param = get image urls, array or id from acf
  let mediasURL = `${baseURL}/wp-json/wp/v2/medias?_fields=author,title.rendered,acf&acf_format=standard`;

  // fetching data
  const {
    data: mediasData,
    loading: mediasLoading,
    error: mediasError,
  } = useAxiosGet(mediasURL);

  // ordering data
  const medias = mediasData.map((data) => {
    return {
      authorID: data.author,
      title: data.title.rendered,
      mediaURL: data.acf.media,
      price: data.acf.price,
      tags: data.acf.tags,
    };
  });

  console.log(medias);
  // const images = useSelector((state) => state.data.medias);
  const [isLiked, setIsLiked] = useState(true);
  const dispatch = useDispatch();

  const handleLikes = (id) => {
    const newState = medias.map((obj) => {
      // update current obj
      if (obj.id === id) {
        setIsLiked(!isLiked);
        if (isLiked) {
          return { ...obj, likes: obj.likes + 1, isLiked: isLiked };
        } else {
          return { ...obj, likes: obj.likes - 1, isLiked: isLiked };
        }
      }
      // otherwise return object as is
      return obj;
    });
    console.log(newState);
    dispatch(setCurrentMedias(newState));
  };

  let DATA;

  if (mediasLoading) {
    DATA = <Text>Loading...</Text>;
  }
  if (mediasError) {
    DATA = <Text>{error}</Text>;
  }

  if (!mediasLoading && !mediasError) {
    DATA = (
      <View>
        <FlatList
          keyExtractor={(item) => item.id}
          horizontal={false}
          numColumns={medias.length}
          columnWrapperStyle={styles.flatList}
          data={medias}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={styles.imageWrapper}>
                <ImageBackground
                  resizeMode="cover"
                  source={{
                    uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/${item.photographerId}/${item.image}`,
                  }}
                  style={styles.image}
                ></ImageBackground>
              </View>
              <View style={styles.description}>
                <Text>{item.alt}</Text>
                <Text>{item.likes}</Text>
                <TouchableOpacity onPress={() => handleLikes(item.id)}>
                  <Image
                    resizeMode="cover"
                    source={
                      item.isLiked
                        ? {
                            uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/heart.png`,
                          }
                        : {
                            uri: `https://claire-lavigne.github.io/ClaireLavigne_6_09122020/assets/heart-outline.png`,
                          }
                    }
                    style={styles.heartIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  return <View>{DATA}</View>;
};

export default Gallery;

const styles = StyleSheet.create({
  flatList: {
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    alignItems: "center",
    paddingVertical: 15,
  },
  imageWrapper: {
    flex: 1,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  image: {
    width: 350,
    height: 300,
    borderRadius: 5,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  heartIcon: {
    width: 20,
    height: 20,
    opacity: 0.8,
  },
  description: {
    width: 350,
    color: "#fff",
    paddingTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
