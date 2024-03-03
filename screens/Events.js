import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useState } from "react";

import TopMostCard from "../Components/TopMostCard";
import OngoingUpcomingButton from "../Components/OngoingUpcomingButtons";
import OngoingScreen from "./OngoingScreen";
import UpcomingScreen from "./UpcomingScreen";
export default function Events() {
    const [screen, setScreen] = useState(1);
    function renderOngoing() {
      setScreen(1);
    }
    function renderUpcoming() {
      setScreen(0);
    }
  return (
      <SafeAreaView style={styles.container}>
      <TopMostCard />
      <View style={styles.ButtonContainer}>
        <OngoingUpcomingButton
          onPress={renderOngoing}
          currentScreen={screen}
          currentButton={0}
        >
          ONGOING
        </OngoingUpcomingButton>
        <OngoingUpcomingButton
          onPress={renderUpcoming}
          currentScreen={screen}
          currentButton={1}
        >
          UPCOMING
        </OngoingUpcomingButton>
      </View>
      {screen == 1 ? <OngoingScreen /> : <UpcomingScreen />}
      <View style={styles.bottomnav}>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#000000",
    },
    ButtonContainer: {
      marginLeft: 16,
      flexDirection: "row",
      marginBottom: 24,
    },
    bottomnav: {
        flex: 0.15,
        backgroundColor: "#000000",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        height: 50,
        borderRadius: 30,
      },
  });
