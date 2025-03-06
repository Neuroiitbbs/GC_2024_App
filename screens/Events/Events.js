import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  RefreshControl,
  FlatList,
} from "react-native";
import { Icon } from "react-native-elements";
import { useState, useContext, useEffect, useCallback } from "react";
import { EventsContext } from "../../store/EventsContext";
import TopMostCard from "../../Components/TopMostCard";
import OngoingUpcomingButton from "../../Components/OngoingUpcomingButtons";
import OngoingScreen from "./OngoingScreen";
import UpcomingScreen from "./UpcomingScreen";
import TechEventScreen from "./TechEventScreen";
import CultEventScreen from "./CultEventScreen";
import PastScreen from "./PastScreen";

export default function Events({ route, navigation }) {
  const field = route?.params?.field || "Sports";
  const [screen, setScreen] = useState(1);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  // Access EventsContext
  const { fetchAllLiveEvents } = useContext(EventsContext);

  // Fetch events on mount
  useEffect(() => {
    fetchAllLiveEvents();
  }, []);

  // Pull-to-refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await fetchAllLiveEvents();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    if (route.params?.reloader === 1) {
      onRefresh();
    }
  }, [route.params?.reloader, onRefresh]);

  // Switch screen
  const setActiveScreen = (screenIndex) => setScreen(screenIndex);

  // Wrap all the content in a fragment to render as a single item
  const content = (
    <>
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

      {/*<TopMostCard />*/}

      {field === "Sports" ? (
        <>
          <View style={styles.buttonContainer}>
            <OngoingUpcomingButton
              onPress={() => setActiveScreen(2)}
              currentScreen={screen}
              currentButton={2}
            >
              PAST
            </OngoingUpcomingButton>

            <OngoingUpcomingButton
              onPress={() => setActiveScreen(1)}
              currentScreen={screen}
              currentButton={1}
            >
              ONGOING
            </OngoingUpcomingButton>

            <OngoingUpcomingButton
              onPress={() => setActiveScreen(0)}
              currentScreen={screen}
              currentButton={0}
            >
              UPCOMING
            </OngoingUpcomingButton>
          </View>

          {/* Main Content */}
          <View style={styles.screenContainer}>
            {screen === 2 ? (
              <PastScreen search={search} />
            ) : screen === 1 ? (
              <OngoingScreen search={search} />
            ) : (
              <UpcomingScreen search={search} navigation={navigation} />
            )}
          </View>
        </>
      ) : field === "Tech" ? (
        <TechEventScreen navigation={navigation} search={search} />
      ) : (
        <CultEventScreen navigation={navigation} search={search} />
      )}
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={[1]} // Dummy data to render a single item
        keyExtractor={(item, index) => index.toString()}
        renderItem={() => content}
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 10,
    marginTop: 10,
  },
  searchBox: {
    color: "white",
    width: "90%",
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
  buttonContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingBottom: 10,
  },
  // Make the screen container taller:
  screenContainer: {
    flex: 1.2, // Increase flex to give more space
    minHeight: 600, // Alternatively, give a fixed minimum height
    paddingBottom: 20, // Extra padding if needed
  },
});
