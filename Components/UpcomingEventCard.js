import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import VoteButton from "./VoteButton";

function UpcomingEventCard(props) {
  return (
    <View>
      <LinearGradient
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.65, y: 0.5 }}
        locations={[0.6, 1]}
        colors={["white", "#e3e3e3"]}
        style={styles.cardTop}>
        <Image
          style={styles.LeftImageContainer}
          source={require("../assets/images/ECE-META.jpg")}
        />
        <Image />
        <Image
          style={styles.RightImageContainer}
          source={require("../assets/images/CSE.jpg")}
        />
        <Image />
      </LinearGradient>

      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.BottomTextGame}>{props.gameName}</Text>
          <Text style={styles.BottomTextTeams}>{props.teamA} v/s {props.teamB}</Text>
        </View>
        {/* <VoteButton/> */}
      </View>
    </View>
  );
}

export default UpcomingEventCard;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  cardTop: {
    flexDirection: "row",
    height: 0.15 * deviceHeight,
    marginTop: 12,
    marginHorizontal: 0.04 * deviceWidth,
    padding: 16,
    backgroundColor: "white",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.75,
  },
  cardBottom: {
    marginBottom: 0.04 * deviceHeight,
    height: 0.09 * deviceHeight,
    marginHorizontal: "4%",
    padding: 10,
    backgroundColor: "black",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    elevation: 20,
    shadowColor: "rgb(192, 9, 99)",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
    shadowOpacity: 0.95,

    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  BottomTextGame: {
    color: "white",
    fontSize: 18,
  },
  BottomTextTeams: {
    color: "gray",
  },
  LeftImageContainer: {
    width: deviceWidth < 380 ? 26 : 46,
    height: deviceWidth < 380 ? 26 : 46,
    borderRadius: deviceWidth < 380 ? 13 : 23,
    borderWidth: 3,
    overflow: "hidden",
    margin: 9,
    marginTop: 36,
    position: "absolute",
    left: 9,
  },
  RightImageContainer: {
    width: deviceWidth < 380 ? 26 : 46,
    height: deviceWidth < 380 ? 26 : 46,
    borderRadius: deviceWidth < 380 ? 13 : 23,
    borderWidth: 3,
    overflow: "hidden",
    margin: 9,
    marginTop: 36,
    position: "absolute",
    right: 9,
  },
  LEFTscoreText: {
    fontSize: 26,
    color: "#322d2d",
    position: "absolute",
    left: 70,
    margin: 9,
    marginTop: 38,
  },
  RIGHTscoreText: {
    color: "#322d2d",
    fontSize: 26,
    position: "absolute",
    right: 70,
    margin: 9,
    marginTop: 38,
  },
  
});
