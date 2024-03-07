import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { backend_link } from "../utils/constants";

import logoPaths from "../utils/logoPaths";
import setProperTeamName from "../utils/setProperTeamName";

function OngoingEventCard(props) {
  // console.log(props);

  const teamA = setProperTeamName(props.teamA);
  const teamB = setProperTeamName(props.teamB);

  const [update, setUpdate] = useState(false);
  const [scoreTeamA, setScoreTeamA] = useState();
  const [scoreTeamB, setScoreTeamB] = useState();

  const submitHandler = async () => {
    if (
      scoreTeamA === undefined ||
      scoreTeamB === undefined ||
      scoreTeamA === null ||
      scoreTeamB === null
    )
      return;
    const idx = props.gameName
      .split(" ")
      .findIndex((word) => word.toLowerCase() === "vs");
    const eventId = props.gameName
      .split(" ")
      .slice(0, idx - 1)
      .join(" ");
    const subEventId = props.gameName
      .split(" ")
      .slice(idx - 1, idx + 2)
      .join(" ");
    const points = {
      teamA: {
        name: props.teamA,
        points: scoreTeamA,
      },
      teamB: {
        name: props.teamB,
        points: scoreTeamB,
      },
    };
    const email = "21cs01026@iitbbs.ac.in";
    console.log("hii");
    const body = {
      eventId,
      subEventId,
      email,
      points,
      // title: props.details?.title,
      // description: "Description",
      // location: props.details?.location,
      // timestamp: props.details?.timestamp || Date.now().toString(),
      // type: "Final",
      status: props.status,
    };
    console.log(body);
    try {
      const resp = await axios.post(
        backend_link + "api/event/updateLiveEvent",
        body
      );
      console.log(resp);
      props.setIsEventUpdated((prev) => !prev);
      Alert.alert("Score Updated");
    } catch (err) {
      console.log("points update failed", err);
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <View>
      <LinearGradient
        start={{ x: 0.2, y: 0.1 }}
        end={{ x: 0.65, y: 0.5 }}
        locations={[0.6, 1]}
        colors={["white", "#e3e3e3"]}
        style={styles.cardTop}
      >
        <Image style={styles.LeftImageContainer} source={logoPaths[teamA]} />
        <Image />
        <Text style={styles.LEFTscoreText}>{props.scoreA}</Text>
        <Text style={styles.RIGHTscoreText}>{props.scoreB}</Text>
        <Image style={styles.RightImageContainer} source={logoPaths[teamB]} />
        <Image />
      </LinearGradient>

      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.BottomTextGame}>{props.details?.location}</Text>
          <Text style={styles.BottomTextTeams}>
            {props.teamA} v/s {props.teamB}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.UpdateScoreButton}
          onPress={() => {
            setUpdate(!update);
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Update</Text>
        </TouchableOpacity>
      </View>
      {update && (
        <>
          <View style={styles.container}>
            <View style={styles.innerContainer}>
              <View style={styles.textView}>
                <TextInput
                  style={{ height: 40 }}
                  placeholder="   Score Team Left"
                  onChangeText={(newText) => setScoreTeamA(newText)}
                  defaultValue={scoreTeamA}
                />
              </View>
              <View style={{ width: 10 }}></View>
              <View style={styles.textView}>
                <TextInput
                  style={{ height: 40 }}
                  placeholder="   Score Team Right"
                  onChangeText={(newText) => setScoreTeamB(newText)}
                  defaultValue={scoreTeamB}
                />
              </View>
            </View>

            <View style={styles.button}>
              <Button onPress={submitHandler} title="Submit"></Button>
            </View>
          </View>
        </>
      )}
    </View>
  );
}

export default OngoingEventCard;

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
    // height: 0.09 * deviceHeight,
    marginHorizontal: "4%",
    padding: 10,
    backgroundColor: "black",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    elevation: 20,
    shadowColor: "rgb(192, 9, 99)",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 1,
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
  UpdateScoreButton: {
    backgroundColor: "rgb(212,36,119	)",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 75,
    height: 45,
    padding: 3,
  },
  container: {
    flexDirection: "column",
    flex: 1,
    position: "relative",
    top: -35,
    padding: 20,
    paddingBottom: 0,
  },
  innerContainer: {
    // backgroundColor:"white",
    flexDirection: "row",
    height: 40,
    alignItems: "stretch",
    flex: 1,
    paddingTop: 10,
  },
  textView: {
    backgroundColor: "white",
    flex: 1,
    width: 10,
    height: 40,
    border: 10,
    borderColor: "black",
    borderRadius: 10,
  },
  button: {
    paddingVertical: 20,
    border: 10,
    borderColor: "black",
    borderRadius: 10,
  },
});
