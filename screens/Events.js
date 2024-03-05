import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import TopMostCard from "../Components/TopMostCard";
import OngoingUpcomingButton from "../Components/OngoingUpcomingButtons";
import OngoingScreen from "./OngoingScreen";
import UpcomingScreen from "./UpcomingScreen";
import axios from "axios";
import { backend_link } from "../utils/constants";
import TechEventScreen from "./TechEventScreen";
import CultEventScreen from "./CultEventScreen";
import Header from "../Components/Header";

export default function Events({ route, navigation }) {
  const field = route?.params?.field || "Sports";
  console.log("field", field);
  const [screen, setScreen] = useState(1);
  const [techEvents, setTechEvents] = useState([]);
  const [cultEvents, setCultEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/event/getEventByCategory?category=tech"
        );
        const data = response.data.events;
        const techdata = [];
        data.map((item) => {
          item !== null && techdata.push(item);
        });
        setTechEvents(techdata);
        console.log(techdata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/event/getEventByCategory?category=cult"
        );
        const data = response.data.events;
        const cultdata = [];
        data.map((item) => {
          item !== null && cultdata.push(item);
        });
        setCultEvents(cultdata);
        console.log(cultdata);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  function renderOngoing() {
    setScreen(1);
  }
  function renderUpcoming() {
    setScreen(0);
  }
  return (
    <SafeAreaView style={styles.container}>
      <TopMostCard />
      {field === "Sports" && (
        <>
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
          <View style={styles.bottomnav}></View>
        </>
      )}
      {field === "Tech" && (
        <>
          <TechEventScreen data={techEvents} navigation={navigation} />
        </>
      )}
      {field === "Cultural" && (
        <>
          <CultEventScreen data={cultEvents} navigation={navigation} />
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
