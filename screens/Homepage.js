import { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  Pressable,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Carousel, { Pagination } from "react-native-snap-carousel-new";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import CarouselCard from "../Components/CarouselCard";
import axios from "axios";
import { backend_link } from "../utils/constants";

var { width, height } = Dimensions.get("window");

const banners = {
  CSE: require("../assets/TeamBanners/CSE.jpg"),
  ECE_META: require("../assets/TeamBanners/ECE.jpg"),
  EE: require("../assets/TeamBanners/EE.jpg"),
  CE: require("../assets/TeamBanners/CE.jpg"),
  ME: require("../assets/TeamBanners/ME.jpg"),
};

// {
//    Team a - mtech
//     Team b - ece meta
//     Team c - cse
//     Team d - civil
//     Team e - ee
//     Team f - phd
//     Team g - mech
//     Team h - msc + itep
// }
export default function HomePage() {
  const navigation = useNavigation();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleSnapToItem = (index) => {
    console.log("snapped to", index);
    setCurrentItemIndex(index);
  };

  const [activeIndex, setActiveIndex] = useState(1);

  const [Ids, setIds] = useState([]);
  const [cardata, setcardata] = useState([]);

  const [newsIds, setnewsIds] = useState([]);
  const [newscardata, setnewscardata] = useState([]);

  useEffect(() => {
    const getAllCarousels = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/assets/getCarouselImages"
        );
        console.log("response", response.data);
        const ids = Object.keys(response.data);
        console.log(ids);
        console.log(response.data);
        setIds(ids);
        setcardata(response.data);
      } catch (err) {
        console.log("Failed to get Carousel Images", err);
      }
    };

    const getNewsCarousels = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/assets/getNewsImages"
        );
        console.log("response", response.data);
        const ids = Object.keys(response.data);
        console.log(ids);
        console.log(response.data);
        setnewsIds(ids);
        setnewscardata(response.data);
      } catch (err) {
        console.log("Failed to get Carousel Images", err);
      }
    };
    getAllCarousels();
    getNewsCarousels();
  }, []);

  data = {
    banners: [
      require("../assets/CarouselBanners/Banner1.jpg"),
      require("../assets/CarouselBanners/Banner1.jpg"),
    ],
    teams: [
      // require("../assets/TeamBanners/CSE.jpg"),
      // require("../assets/TeamBanners/ECE.jpg"),
      // require("../assets/TeamBanners/EE.jpg"),
      // require("../assets/TeamBanners/CE.jpg"),
      // require("../assets/TeamBanners/ME.jpg"),
      banners.CSE,
      banners.ECE_META,
      banners.EE,
      banners.CE,
      banners.ME,
    ],
    news: [
      require("../assets/news/news1.jpg"),
      require("../assets/news/news1.jpg"),
    ],
  };

  const teams = ["CSE", "ECE_META", "EE", "CIVIL", "MECH"];

  const renderPagination = () => {
    return (
      <Pagination
        dotsLength={cardata?.length || 2}
        activeDotIndex={activeIndex}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    );
  };
  const handlePress = () => {
    console.log("Pressed", currentItemIndex);
    console.log(teams[currentItemIndex]);
    navigation.navigate("   ", {
      branch: teams[currentItemIndex],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View
        style={{
          flex: 1,
          maxHeight: "85%",
        }}
      >
        <ScrollView style={styles.content}>
          <View style={styles.newsSection}>
            <Carousel
              data={Ids}
              renderItem={({ item }) => (
                <CarouselCard
                  item={{ uri: cardata[item]?.imageUrl }}
                  height={"100%"}
                  width={width * 0.9}
                />
                // : <Text>Loading...</Text>
              )}
              firstItem={1}
              sliderWidth={width}
              itemWidth={width * 0.62}
              inactiveSlideOpacity={0}
              vertical={false}
              slideStyle={{ display: "flex", alignItems: "center" }}
              onSnapToItem={(index) => setActiveIndex(index)}
              autoplay={true}
              // enableSnap={true}
              loop={true}
            />
            {renderPagination()}
          </View>

          <View style={styles.newsSection1}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: -70,
              }}
            >
              <Text style={styles.newsTitle}>NEWS</Text>
              <TouchableOpacity onPress={() => navigation.navigate("NewsPage")}>
                <Text style={{ color: "#BA1D55", marginRight: "0%" }}>
                  View all {">"}{" "}
                </Text>
              </TouchableOpacity>
            </View>

            <Carousel
              layout="default"
              data={newsIds}
              renderItem={({ item }) => (
                <View style={{ flex: 1 }}>
                  <Text
                    style={{ color: "#d41d77", fontSize: 18, paddingBottom: 1 }}
                  >
                    {newscardata[item]?.title}
                  </Text>
                  <Text
                    style={{
                      color: "white",
                      fontSize: 14,
                      paddingBottom: 5,
                    }}
                  >
                    {newscardata[item]?.description
                      ? newscardata[item]?.description?.slice(0, 40) + "..."
                      : ""}
                  </Text>
                  <CarouselCard
                    item={{ uri: newscardata[item]?.imageUrl }}
                    height={140}
                    width={width * 0.9}
                    borderRadius={15}
                  />
                </View>
              )}
              firstItem={1}
              sliderWidth={width}
              itemWidth={width * 0.62}
              inactiveSlideOpacity={0}
              vertical={false}
              slideStyle={{ display: "flex", alignItems: "center" }}
              loop={true}
              autoplay={true}
              // enableSnap={true}
            />
          </View>

          <View style={styles.teamsSection}>
            <Text style={styles.teamsTitle}>ALL TEAMS</Text>
            <Pressable onPress={handlePress}>
              <Carousel
                layout="default"
                data={data.teams}
                renderItem={({ item }) => (
                  <CarouselCard
                    item={item}
                    height={"100%"}
                    width={width * 0.9}
                  />
                )}
                firstItem={1}
                onSnapToItem={handleSnapToItem}
                sliderWidth={width}
                itemWidth={width * 0.62}
                inactiveSlideOpacity={0}
                vertical={false}
                slideStyle={{ display: "flex", alignItems: "center" }}
                loop={true}
                autoplay={true}

                // enableSnap={true}
              />
            </Pressable>
          </View>
          <View
            style={{
              width: "100%",
              height: 50,
            }}
          ></View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    width: "90%",
    height: 50,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingleft: 2,
    paddingTop: 10,
    margin: 20,
  },
  content: {
    flex: 1,
    // paddingTop: 20,
  },
  bannerContainer: {
    height: 200,
    backgroundColor: "#e0e0e0", // Placeholder color
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  newsSection: {
    width: "90%",
    height: 220,
    marginTop: 30,
    paddingHorizontal: 5,
    justifyContent: "center",
    padding: 5,
  },
  newsSection1: {
    width: "90%",
    height: 180,
    marginTop: 30,
    paddingHorizontal: 5,
    justifyContent: "center",
    padding: 5,
  },
  newsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "white",
    paddingLeft: 5,
  },
  teamsSection: {
    width: 358,
    height: 112,
    marginTop: 30,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  teamsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "white",
    padding: 5,
  },
  socialMediaSection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  newsImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
});
