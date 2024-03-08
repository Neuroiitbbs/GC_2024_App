import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useState } from "react";
import TopMostCard from "../../Components/TopMostCard";
import OngoingUpcomingButton from "../../Components/OngoingUpcomingButtons";
import OngoingScreen from "./OngoingScreen";
import UpcomingScreen from "./UpcomingScreen";
import TechEventScreen from "./TechEventScreen";
import CultEventScreen from "./CultEventScreen";
import PastScreen from "./PastScreen";

export default function Events({ route, navigation }) {
  const field = route?.params?.field || "Sports";
  console.log("field", field);
  const [screen, setScreen] = useState(1);

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
            <OngoingScreen />
          ) : screen == 0 ? (
            <UpcomingScreen />
          ) : (
            <PastScreen />
          )}
          <View style={styles.bottomnav}></View>
        </>
      )}

      {field === "Tech" && (
        <>
          <TechEventScreen navigation={navigation} />
        </>
      )}
      {field === "Cultural" && (
        <>
          <CultEventScreen navigation={navigation} />
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
    padding: 0,
    flex: 1,
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
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
