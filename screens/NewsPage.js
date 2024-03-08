import React from "react";
import CarouselCard from "../Components/CarouselCard";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  ScrollView,
} from "react-native";

const NewsPage = () => {
  const data = {
    news: [
      {
        content: require("../assets/news/news1.jpg"),
        id: 1,
      },
      {
        content: require("../assets/news/news1.jpg"),
        id: 2,
      },
      {
        content: require("../assets/news/news1.jpg"),
        id: 5,
      },
      {
        content: require("../assets/news/news1.jpg"),
        id: 6,
      },

      {
        content: require("../assets/news/news1.jpg"),
        id: 3,
      },
    ],
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

        <FlatList
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
        />
        <View style={{ height: 50 }}></View>
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
  card: {
    width: 340,
    height: 112,
    marginTop: 10,
    marginHorizontal: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
  },
});
