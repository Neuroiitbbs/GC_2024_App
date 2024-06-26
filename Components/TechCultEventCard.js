import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import logoPaths from "../utils/logoPaths";
import setProperTeamName from "../utils/setProperTeamName";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

function TechCultEventCard(props) {
  const navigation = props.navigation;
  props = props?.data?.item || props?.data || props;
  props = props?.data?.data || props?.data || props;
  const formattedDate = new Date(props.details?.timestamp).toLocaleDateString();
  const formattedTime = new Date(props.details?.timestamp).toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  return (
    <View style={{paddingBottom:2,paddingTop:2}}>
      <Pressable
        onPress={() => {
          navigation.navigate("SpecificEvent", {
            data: props,
          });
        }}
      >
        <LinearGradient
          start={{ x: -0.4, y: 0.0 }}
          end={{ x: 0.7, y: 1 }}
          locations={[0.2, 0.8]}
          colors={["#FDFCFB", "#E2D1C3"]}
          style={styles.cardTop}
        >
          <View style={{
            height: 0.07 * deviceHeight,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 10,
            // backgroundColor: "black",
          }}>
            <Text
             style={{ fontWeight: "600", fontSize: 20 }}
            >
              {props.details?.title}
            </Text>
            {/* <Text
            style={{
              fontWeight: "700",
              paddingBottom: 20,
              position: "relative",
              left: deviceWidth * 0.04,
            }}
          >
            {props.id}
          </Text> */}
            {/* <Text style={{ fontWeight: "700" }}>{props.data.details.location}</Text> */}
          </View>
          {/* <Image style={styles.LeftImageContainer} source={logoPaths[teamA]} /> */}
          {/* <Image /> */}
          {/* <Text style={styles.LEFTscoreText}>{props.scoreA}</Text> */}
          {/* <Text style={styles.RIGHTscoreText}>{props.scoreB}</Text> */}
          {/* <Image style={styles.RightImageContainer} source={logoPaths[teamB]} /> */}
          {/* <Image /> */}
        </LinearGradient>

        <View style={styles.cardBottom}>
          <View>
            {/* <Text style={styles.BottomTextGame}>{props.details?.title}</Text> */}
            <Text style={styles.BottomTextTeams}>
              {props.details?.location}
            </Text>
          </View>
          <View style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}>
            <Text style={styles.BottomTextGame}>{formattedDate}</Text>
            <Text style={styles.BottomTextTime}>{formattedTime}</Text>
          </View>
          {/* <VoteButton /> */}
        </View>
      </Pressable>
    </View>
  );
}

export default TechCultEventCard;

const styles = StyleSheet.create({
  cardTop: {
    flexDirection: "row",
    height: 0.08 * deviceHeight,
    marginTop: 12,
    marginHorizontal: 0.04 * deviceWidth,
    // padding: 16,
    backgroundColor: "white",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.75,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  cardBottom: {
    marginBottom: 0.01 * deviceHeight,
    height: 0.07 * deviceHeight,
    marginHorizontal: "4%",
    padding: 10,
    backgroundColor: "#1A1A2E",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    elevation: 6,
    shadowColor: "#d41d77",
     // shadowColor: "#1A1A2E",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 0.5,
    shadowOpacity: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  BottomTextGame: {
    color: "white",
    fontSize: 16,
  },
  BottomTextTeams: {
    color: "white",
    fontSize: 18,
  },
  BottomTextTime: {
    color: "gray",
    // position: "relative",
    // right: -26,
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
