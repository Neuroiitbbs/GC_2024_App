import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Dimensions,
} from "react-native";
import { Icon } from "react-native-elements";
import { useState, useContext, useEffect } from "react";
import { EventsContext } from "../../store/EventsContext";
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
  const [screen, setScreen] = useState(1);
  const [search, setSearch] = useState("");

  // Access EventsContext
  const { fetchAllLiveEvents } = useContext(EventsContext);

  // Fetch events only once when the component mounts
  useEffect(() => {
    fetchAllLiveEvents();
  }, []);

  // Unified function to update active screen
  const setActiveScreen = (screenIndex) => setScreen(screenIndex);

  const screens = {
    1: <OngoingScreen search={search} />,
    0: <UpcomingScreen search={search} navigation = {navigation} />,
    2: <PastScreen search={search} />,
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBox}>
          <Icon name="search1" type="antdesign" color="white" size={20} />
          <TextInput
            style={styles.searchInput}
            color="white"
            onChangeText={(text) => setSearch(text)}
            placeholder="Search"
            placeholderTextColor="grey"
          />
        </View>
      </View>

      <TopMostCard />

      {field === "Sports" ? (
        <>
          <View style={styles.ButtonContainer}>
            <OngoingUpcomingButton onPress={() => setActiveScreen(2)} currentScreen={screen} currentButton={2}>
              PAST
            </OngoingUpcomingButton>

            <OngoingUpcomingButton onPress={() => setActiveScreen(1)} currentScreen={screen} currentButton={1}>
              ONGOING
            </OngoingUpcomingButton>

            <OngoingUpcomingButton onPress={() => setActiveScreen(0)} currentScreen={screen} currentButton={0}>
              UPCOMING
            </OngoingUpcomingButton>
          </View>

          {screens[screen]} 
          <View style={styles.bottomnav}></View>
        </>
      ) : field === "Tech" ? (
        <TechEventScreen navigation={navigation} search={search} />
      ) : (
        <CultEventScreen navigation={navigation} search={search} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#000000",
  },
  searchContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
  },
  searchBox: {
    color: "white",
    width: "90%",
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 10,
    borderColor: "white",
  },
  searchInput: {
    width: "90%",
    height: 40,
    paddingLeft: 10,
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