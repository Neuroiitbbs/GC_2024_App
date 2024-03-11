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

import Carousel, {
  Pagination,
  ParallaxImage,
} from "react-native-snap-carousel-new";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import CarouselCard from "../Components/CarouselCard";
import axios from "axios";
import { backend_link } from "../utils/constants";
import { ActivityIndicator } from "react-native-paper";

var { width, height } = Dimensions.get("window");

const banners = {
  CSE: require("../assets/TeamBanners/CSE.png"),
  ECE_META: require("../assets/TeamBanners/ECE.png"),
  EE: require("../assets/TeamBanners/EE.png"),
  CE: require("../assets/TeamBanners/CIVIL.png"),
  ME: require("../assets/TeamBanners/MECH.png"),
  MTech: require("../assets/TeamBanners/MTech.png"),
  PhD: require("../assets/TeamBanners/PhD.png"),
  MSc_ITEP: require("../assets/TeamBanners/MSc_ITEP.png"),
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
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleSnapToItem = (index) => {
    console.log("snapped to", index);
    setCurrentItemIndex(index);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

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
      banners.MTech,
      banners.MSc_ITEP,
      banners.PhD,
    ],
    news: [
      require("../assets/news/news1.jpg"),
      require("../assets/news/news1.jpg"),
    ],
  };

  const teams = [
    "CSE",
    "ECE_META",
    "EE",
    "CIVIL",
    "MECH",
    "MTech",
    "MSc_ITEP",
    "PHD",
  ];

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
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000",
          }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
      {!loading && (
        <View style={styles.container}>
          <View style={styles.content}>
            <View style={styles.newsSection}>
              <Carousel
                enableMomentum={true}
                layout="default"
                decelerationRate={0.9}
                data={Ids}
                renderItem={({ item }) => (
                  <CarouselCard
                    item={{ uri: cardata[item]?.imageUrl }}
                    height={"100%"}
                    width={width * 0.9}
                    borderRadius={15}
                  />
                  //   <ParallaxImage
                  //     source={{ uri: cardata[item]?.imageUrl }}
                  //     containerStyle={styles.imageContainer}
                  //     style={styles.image}
                  //     parallaxFactor={0.4}

                  // />
                  // : <Text>Loading...</Text>
                )}
                firstItem={1}
                sliderWidth={width}
                itemWidth={width * 0.88}
                inactiveSlideOpacity={0.4}
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
                <TouchableOpacity
                  onPress={() => navigation.navigate("NewsPage")}
                >
                  <Text style={{ color: "#BA1D55", marginRight: "0%" }}>
                    View all {">"}{" "}
                  </Text>
                </TouchableOpacity>
              </View>

              <Carousel
                enableMomentum={true}
                layout="default"
                decelerationRate={0.9}
                data={newsIds}
                renderItem={({ item }) => (
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        color: "#d41d77",
                        fontSize: 18,
                        paddingBottom: 1,
                      }}
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
                itemWidth={width * 0.88}
                inactiveSlideOpacity={0.4}
                vertical={false}
                slideStyle={{ display: "flex", alignItems: "center" }}
                loop={true}
                autoplay={true}
                enableSnap={true}
              />
            </View>

            <View style={styles.teamsSection}>
              <Text style={styles.teamsTitle}>ALL TEAMS</Text>

              <Carousel
                enableMomentum={true}
                decelerationRate={0.9}
                layout="default"
                data={data.teams}
                renderItem={({ item }) => (
                  <Pressable onPress={handlePress}>
                    <CarouselCard
                      item={item}
                      height={"100%"}
                      width={width * 0.9}
                    />
                  </Pressable>
                )}
                firstItem={1}
                onSnapToItem={handleSnapToItem}
                sliderWidth={width}
                itemWidth={width * 0.87}
                inactiveSlideOpacity={0.4}
                vertical={false}
                slideStyle={{ display: "flex", alignItems: "center" }}
                loop={true}
                autoplay={true}

                // enableSnap={true}
              />
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 200,
            }}
          ></View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    backgroundColor: "#000000",
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
    marginTop: 10,
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
    width: 370,
    height: 135,
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
