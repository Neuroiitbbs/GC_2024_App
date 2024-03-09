import React, { useEffect, useState } from "react";

import CarouselCard from "../Components/CarouselCard";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  Button,
  FlatList,
  Dimensions,
  Image,
  SafeAreaView,
  Pressable,
} from "react-native";
import axios from "axios";
import { backend_link } from "../utils/constants";
const { width, height } = Dimensions.get("window");

const sortNewsbyDate = (data) => {
  console.log("data", data);

  data.sort((a, b) => {
    const dateA = new Date(
      a.timestamp._seconds * 1000 + a.timestamp._nanoseconds / 1000000
    );
    const dateB = new Date(
      b.timestamp._seconds * 1000 + b.timestamp._nanoseconds / 1000000
    );
    console.log("dateA", dateA);
    console.log("dateB", dateB);
    return dateB - dateA;
  });
  console.log("sordata", data);
  return data;
};

const NewsPage = ({ navigation }) => {
  const [Ids, setIds] = useState([]);
  const [dataValues, setDataValues] = useState([]);

  // const data = {
  //   news: [
  //     {
  //       content: require("../assets/news/news1.jpg"),
  //       id: 1,
  //     },
  //     {
  //       content: require("../assets/news/news1.jpg"),
  //       id: 2,
  //     },
  //     {
  //       content: require("../assets/news/news1.jpg"),
  //       id: 5,
  //     },
  //     {
  //       content: require("../assets/news/news1.jpg"),
  //       id: 6,
  //     },

  //     {
  //       content: require("../assets/news/news1.jpg"),
  //       id: 3,
  //     },
  //   ],
  // };

  useEffect(() => {
    const getAllCarousels = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/assets/getNewsImages"
        );
        console.log("response", response.data);
        const ids = Object.keys(response.data);
        setIds(ids);
        const sortedData = sortNewsbyDate(Object.values(response.data));
        setDataValues(sortedData);
        return response;
      } catch (err) {
        console.log("Failed to get Carousel Images", err);
      }
    };
    getAllCarousels();
  }, []);

  const renderItem = ({ item, index }) => {
    console.log("item", item);
    return (
      <Pressable
        onPress={() => navigation.navigate("SpecificNewsPage", { data: item })}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            border: 1,
            borderWidth: 1,
            borderBottomColor: "white",
            borderTopColor: index === 0 ? "white" : "black",
          }}
        >
          <Text style={{ color: "white", fontSize: 20, padding: 10 }}>
            {item.title}
          </Text>
          <View style={{ flex: 1, border: 2, borderRadius: 15 }}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: width * 0.9, height: 150, borderRadius: 15 }}
              alt="Carousel-Image"
            />
            <Text style={{ color: "white", fontSize: 14, padding: 20 }}>
              {item?.description
                ? item?.description?.slice(0, 100) + "..."
                : ""}
            </Text>
            {/* <Text style={{color:'white',fontSize:20,padding:20}}>{item.imageUrl}</Text> */}
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <SafeAreaView>
      <View style={styles.newsSection}>
        <Image
          source={require("../assets/OracleLogo.jpg")}
          style={{
            width: 159,
            height: 160,
            resizeMode: "stretch",
            marginBottom: 20,
            marginTop: 50,
          }}
        />

        {/* <FlatList
          data={data.news} // Corrected data structure
          renderItem={({ item }) => (
            <View style={styles.card}>
              <CarouselCard
                item={item.content}
                height={"100%"}
                width={"100%"}
              />
            </View>
          )}
          keyExtractor={(item) => item.id.toString()} // Converted id to string
        /> */}
        <FlatList
          data={dataValues}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          alwaysBounceVertical={false}
          style={{
            flex: 0.9,
            height: "60%",
          }}
        />
        <View style={{ height: 80 }}></View>
      </View>
    </SafeAreaView>
  );
};

export default NewsPage;

const styles = StyleSheet.create({
  newsSection: {
    height: "100%",
    backgroundColor: "#000",
    alignItems: "center",
  },
  // logo: {
  //   borderWidth: 1,
  //   borderBottomColor: "white",
  //   borderTopColor: "white",
  // },
  card: {
    width: 340,
    height: 112,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
