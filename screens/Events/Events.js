import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";

import { useState } from "react";
import TopMostCard from "../../Components/TopMostCard";
import OngoingUpcomingButton from "../../Components/OngoingUpcomingButtons";
import OngoingScreen from "./OngoingScreen";
import UpcomingScreen from "./UpcomingScreen";
import TechEventScreen from "./TechEventScreen";
import CultEventScreen from "./CultEventScreen";
import PastScreen from "./PastScreen";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default function Events({ route, navigation }) {
  const field = route?.params?.field || "Sports";
  console.log("field", field);
  console.log("field", field);
  const [screen, setScreen] = useState(2);
  const [search, setSearch] = useState("");

  function renderOngoing() {
    setScreen(1);
  }
  function renderUpcoming() {
    setScreen(0);
  }
  function renderPast() {
    setScreen(2);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          paddingBottom: 10,
        }}
      >
        <View
          style={{
            color: "white",
            width: "90%",
            marginTop: 10,
            alignItems: "center",
            flexDirection: "row",

            borderWidth: 1,
            paddingLeft: 10,
            borderRadius: 10,
            borderColor: "white",
          }}
          onPress={() => console.log("hi")}
        >
          <Icon name="search1" type="antdesign" color="white" size={20} />
          <TextInput
            style={{
              width: "90%",
              height: 40,
              paddingLeft: 10,
            }}
            color="white"
            onChangeText={(text) => setSearch(text)}
            placeholder="Search"
            placeholderTextColor={"grey"}
          />
        </View>
      </View>
      <TopMostCard />
      {field === "Sports" && (
        <>
          <View style={styles.ButtonContainer}>
            <OngoingUpcomingButton
              onPress={renderPast}
              currentScreen={screen}
              currentButton={2}
            >
              PAST
            </OngoingUpcomingButton>

            <OngoingUpcomingButton
              onPress={renderOngoing}
              currentScreen={screen}
              currentButton={1}
            >
              ONGOING
            </OngoingUpcomingButton>

            <OngoingUpcomingButton
              onPress={renderUpcoming}
              currentScreen={screen}
              currentButton={0}
            >
              UPCOMING
            </OngoingUpcomingButton>
          </View>
          {screen == 1 ? (
            <OngoingScreen search={search} />
          ) : screen == 0 ? (
            <UpcomingScreen search={search} />
          ) : (
            <PastScreen search={search} />
          )}
          <View style={styles.bottomnav}></View>
        </>
      )}
      {field === "Tech" && (
        <>
          <TechEventScreen navigation={navigation} search={search} />
        </>
      )}
      {field === "Cultural" && (
        <>
          <CultEventScreen navigation={navigation} search={search} />
        </>
      )}
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000000",
  },
  ButtonContainer: {
    flexDirection: "row",
    marginBottom: 24,

    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  bottomnav: {
    flex: 0.15,
    backgroundColor: "#000000",
    color: "white",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 80,
    borderRadius: 30,
  },
});
