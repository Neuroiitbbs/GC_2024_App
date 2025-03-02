import { LoginContext } from "../store/LoginContext.js";
import { useState, useEffect, useContext } from "react";
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
  FlatList,
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
import { EventSubscriptionVendor } from "react-native";
import { getCorrectTimeStamp } from "../utils/helperFunctions";
import { indigo, red } from "@mui/material/colors";

var { width, height } = Dimensions.get("window");

const banners = {
  CSE: require("../assets/TeamBanners/CSE.png"),
  ECE_META: require("../assets/TeamBanners/ECE.png"),
  EE: require("../assets/TeamBanners/EE.png"),
  CE: require("../assets/TeamBanners/Civil.png"),
  ME: require("../assets/TeamBanners/Mech.png"),
  MTech: require("../assets/TeamBanners/Mtech.png"),
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

function TeamCard() {
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
        <ScrollView style={styles.container}>
          <View style={styles.content}>
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

// #######################################################################################################################################

const formatDate = (datestr) => {
  if (!datestr) return "Unknown Date"; // Handle invalid date cases
  const date = new Date(datestr);
  if (isNaN(date.getTime())) return "Unknown Date"; // Ensure it's a valid date
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

// const fetchLeaderboardData = async (setLeaderboardData) => {
//   try {
//     // const response = await axios.get(`${backend_link}/api/points/getIndividualScores`);

//     const response = { data };

//     if (response.data && Array.isArray(response.data)) {
//       const sortedData = response.data
//         .sort((a, b) => (b.points || 0) - (a.points || 0)) // Ensure points exist
//         .slice(0, 10);
//       setLeaderboardData(sortedData);
//     } else {
//       console.error("Invalid data format from API");
//       setLeaderboardData([]); // Ensure state is updated even in failure cases
//     }
//   } catch (error) {
//     console.error("Error fetching leaderboard data:", error);
//     setLeaderboardData([]); // Avoid leaving state empty
//   }
// };

// const fetchLastUpdated = async () => {
//   try {
//     const response = await axios.get(`${backend_link}/api/event/lastUpdated`);
//     if (response.data && response.data.lastUpdated) {
//       setLastUpdated(formatDate(response.data.lastUpdated));
//     }
//   } catch (error) {
//     console.error("Error fetching last updated date:", error);
//     setLastUpdated("Unknown Date");
//   }
// };

export default function HomePage() {
  const [lastUpdated, setLastUpdated] = useState("Unknown Date");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const LoginCtx = useContext(LoginContext);
  const userEmail = LoginCtx.user.email;
  const [user, setUser] = useState({});

  const fetchLeaderboardData = async () => {
    try {
      const response = await axios.get(backend_link + "api/user/getAllDetails");
      // co
      console.log(response.data);
      // setUser()
      // console.log(data);

      // console.log(userData);
      const {userArray} = response.data;
      console.log("a;sfjads;lfj", response.data);
      const result = userArray.find(obj => obj.mail === userEmail);
      setUser(result);
      // console.log("jeeeban test: ", userArray[userEmail], userEmail);
      initializeCoins(userArray);
      const data = userArray;
      console.log("leaderboard dat: ", data);
      const sortedData = data.sort((a, b) => b.coins - a.coins).slice(0, 10);
      console.log("sorted testing: ", sortedData);
      setLeaderboardData(sortedData);
    } catch (error) {
      console.error("Error fetching leaderboard data:", error);
    }
  };

  const initializeCoins = (data) => {
    data.forEach((id, ind) => {
      if (id.coins === undefined) {
        id.coins = 0;
      }
    });
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, [])

  // async function updateCoinsForWinners() {
  //   try {
  //     const response = await axios.get(
  //       `${backend_link}api/points/fetch-game-data`
  //     );
  //     // console.log("hellasd;fkja;sdfj;sdaf");
  //     const { events, users } = response.data;
  //     const userData = users.details;
  //     const userIds = Object.keys(userData);

  //     const eventData = events[0];
  //     const eventNames = Object.keys(eventData).slice(1);

  //     const yesterdayStart = new Date();
  //     // console.log("test data: ", yesterdayStart);

  //     const ts = new Date(); // Get current date and time
  //     const yts = new Date(ts.getTime() - 24 * 60 * 60 * 1000); // 24 hours before current time
  //     setLeaderboardData(userData);

  //     eventNames.forEach((eventName) => {
  //       const eventId = Object.keys(events[0][eventName])[0];

  //       if (
  //         !eventData[eventName][eventId].data ||
  //         !eventData[eventName][eventId].data.details ||
  //         !eventData[eventName][eventId].data.points
  //       ) {
  //         console.log(
  //           "Skipping event due to missing data:",
  //           eventData[eventName][eventId]
  //         );
  //         return;
  //       }

  //       const endTime = eventData[eventName][eventId].data.details.endTimeStamp;
  //       // console.log(ts - 2 * 60 * 60 * 1000);
  //       const endDate = new Date(endTime); // Convert endTime (timestamp) to Date

  //       if (endDate < yts || endDate > ts) {
  //         console.log("endTime:", endDate.toISOString());
  //         console.log("yts (24 hours ago):", yts.toISOString());
  //         console.log("ts (current time):", ts.toISOString());
  //         console.log("out of bounds");
  //         return;
  //       }

  //       // console.log("Within bounds");

  //       const { teamA, teamB } = eventData[eventName][eventId].data.points;
  //       if (!teamA || !teamB || !teamA.bets || !teamB.bets) {
  //         console.log("Skipping event due to missing team data:", eventData);
  //         return;
  //       }

  //       const updateCoins = (userEmail, amount) => {
  //         if (!userData[userEmail]) {
  //           console.log(`User not found in userData: ${userEmail}`);
  //           return;
  //         }
  //         if (!userData[userEmail].coins) {
  //           userData[userEmail].coins = 0;
  //         }
  //         if (userData[userEmail].coins === 0) {
  //           userData[userEmail].coins = 10000;
  //         }
  //         console.log(
  //           `Updating ${userEmail}: ${userData[userEmail].coins} + ${amount}`
  //         );
  //         userData[userEmail].coins += amount;
  //       };

  //       let winningTeam, losingTeam;
  //       if (teamA.points > teamB.points) {
  //         winningTeam = teamA.bets;
  //         losingTeam = teamB.bets;
  //       } else if (teamB.points > teamA.points) {
  //         winningTeam = teamB.bets;
  //         losingTeam = teamA.bets;
  //       } else {
  //         console.log("Match is a tie, adding 10 points to all participants");
  //         [...Object.keys(teamA.bets), ...Object.keys(teamB.bets)].forEach(
  //           (user) => {
  //             updateCoins(user, 10);
  //           }
  //         );
  //         return;
  //       }
  //       winningTeam.forEach((email, ind) => {
  //         updateCoins(email, 10);
  //       });
  //       losingTeam.forEach((email, ind) => {
  //         updateCoins(email, -10);
  //       });

  //       console.log("final user data: ");
  //       winningTeam.forEach((email, ind) => {
  //         console.log(userData[email]);
  //       });
  //       losingTeam.forEach((email, ind) => {
  //         console.log(userData[email]);
  //       });

  //       let userArray = [];
  //       userIds.forEach((id, ind) => {
  //         userArray.push(userData[id]);
  //       });

  //       initializeCoins(userArray);
  //       fetchLeaderboardData(userArray);
  //       setUser(users.details[userEmail]);
  //       console.log("user is set to : ", userEmail, user);

  //       //updateDoc
        
        
  //     });
  //   } catch (error) {
  //     console.error("Error updating coins:", error);
  //   }
  // }

  // useEffect(() => {
  //   console.log("useEffect triggered: calling updateCoinsForWinners()");
  //   // updateCoinsForWinners();
  // }, []);

  return (
    <SafeAreaView style={leaderboardStyles.container}>
      <View style = {{height: 150, width: "auto"}}>
        <TeamCard />
      </View>
      <View style={leaderboardStyles.item}>
        <Text style={leaderboardStyles.name}>{user?.name || "Unknown"}</Text>
        <Text style={leaderboardStyles.points}>{user?.coins}</Text>
      </View>
      <Text style={leaderboardStyles.heading}>Top 10 Individuals</Text>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item, index) => index.toString()} // Ensure unique keys
        renderItem={({ item, index }) => (
          <View style={leaderboardStyles.item}>
            <Text style={leaderboardStyles.rank}>{index + 1}.</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <Text style={leaderboardStyles.name}>{item.name || "Unknown"}</Text>
            </ScrollView>
            <Text style={leaderboardStyles.points}>{item.coins}</Text>
          </View>
        )}
        style={leaderboardStyles.list}
      />
      <View style={leaderboardStyles.bottomcont}>
        <Text style={leaderboardStyles.text01}>Last Updated on: </Text>
        <Text style={leaderboardStyles.text02}>{lastUpdated}</Text>
      </View>
    </SafeAreaView>
  );
}

const leaderboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  list: {
    width: "100%",
    marginRight: -10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    padding: 15,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#222",
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: "90%",
  },
  rank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "gold",
  },
  name: {
    fontSize: 18,
    color: "white",
    flex: 1,
    textAlign: "center",
  },
  points: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#D41D77",
  },
  bottomcont: {
    flexDirection: "row",
    marginTop: 20,
  },
  text01: {
    color: "#D41D77",
  },
  text02: {
    color: "white",
    fontWeight: "bold",
  },
});

// ############################################################################################################################################################################################################
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
    marginLeft: -10,
    marginRight: -10,
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 10,
  },
  rank: {
    width: 40, // Fixed width for ranking
    textAlign: "center",
  },
  name: {
    minWidth: 100, // Ensures some space for scrolling
    maxWidth: 200, // Limits how far it stretches
  },
  points: {
    width: 80, // Fixed width for points
    textAlign: "right",
  },
});