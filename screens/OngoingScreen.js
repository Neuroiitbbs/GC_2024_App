import TopMostCard from "../Components/TopMostCard";
import OngoingEventCard from "../Components/OngoingEventCard";
import AdminOngoingEventCard from "../Components/adminOngoingEventCard";
import { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";
import axios from "axios";
import Loader from "../Components/Loader";
import { backend_link } from "../utils/constants";

function OngoingScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [ongoingEvents, setOngoingEvents] = useState([
    // {
    //   gameName: "Basketball",
    //   id: "Basketball",
    //   teamA: "ECE-META",
    //   teamB: "CSE",
    //   scoreA: "4",
    //   scoreB: "6",
    // },
    // {
    //   gameName: "Basketball",
    //   id: "Basketball",
    //   teamA: "ECE-META",
    //   teamB: "CSE",
    //   scoreA: "4",
    //   scoreB: "6",
    // },
    // {
    //     gameName: 'Cricket',
    //     id: 'Cricket',
    //     teamA: 'ECE-META',
    //     teamB: 'CSE',
    //     scoreA: '4',
    //     scoreB: '6'
    // },
    // {
    //     gameName: 'Football',
    //     id: 'Football',
    //     teamA: 'ECE-META',
    //     teamB: 'CSE',
    //     scoreA: '4',
    //     scoreB: '6'
    // },
    // {
    //     gameName: 'Tennis',
    //     id: 'Tennis',
    //     teamA: 'ECE-META',
    //     teamB: 'CSE',
    //     scoreA: '4',
    //     scoreB: '6'
    // },
  ]);
  console.log("hi123");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/event/getCurrentlyLiveEvents"
        );
        console.log("response.data   ", response.data);
        const data = response.data.events;
        const events = data.map((item) => {
          console.log("item", item);
          const eventName = item.eventId; //ex. Football BOYS
          const subEvents = item.subEvents;
          console.log("subEvents", subEvents);
          const gameName = eventName;
          const match = subEvents.map((match_item) => {
            const teamA = match_item.data.points.teamA;
            const teamB = match_item.data.points.teamB;
            // const teamA = match_item.data.points
            //   ? match_item.data.points?.teamA;
            //   : match_item.data.pointsTable?.teamA;
            // const teamB = match_item.data.points
            //   ? match_item.data.points?.teamB
            // : match_item.data.pointsTable?.teamB;
            const details = match_item.data.details;
            console.log("details", details);
            // const idx = match_item.data.details.title
            //   .split(" ")
            //   .findIndex((word) => word.toLowerCase() === "vs");
            // const gameName = match_item.data.details.title
            //   .split(" ")
            //   .slice(0, idx - 1)
            //   .join(" ");
            return {
              details: details,
              status: match_item.data.status,
              gameName: gameName,
              id: match_item.subEventId,
              // match_item.data.details.title.split(" ").join("") +
              // match_item.subEventId.split(" ").join(""),
              // teamA: item1.subEventId.split(" vs ")[0],
              // teamB: item1.subEventId.split(" vs ")[1],
              teamA: teamA?.name || match_item.subEventId.split(" vs ")[0],
              teamB: teamB?.name || match_item.subEventId.split(" vs ")[1],
              scoreA: teamA?.points,
              scoreB: teamB?.points,
            };
          });

          return match;
        });
        console.log(events.flat());
        setIsLoading(false);
        setOngoingEvents(events.flat());
      } catch (err) {
        console.log(err);
        Alert.alert("Error", "Something went wrong", [{ text: "Okay" }]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.eventsContainer}>
      <FlatList
        key={1}
        data={ongoingEvents}
        renderItem={(itemData) => {
          return (
            <OngoingEventCard
              details={itemData.item.details}
              gameName={itemData.item.gameName}
              id={itemData.item.id}
              teamA={itemData.item.teamA}
              teamB={itemData.item.teamB}
              scoreA={itemData.item.scoreA}
              scoreB={itemData.item.scoreB}
            />
          );
        }}
        keyExtractor={(item, index) => {
          return item.id + index;
        }}
        alwaysBounceVertical={false}
      />
      <Loader
        visible={isLoading}
        top={250}
        bottom={0}
        setModalVisible={setIsLoading}
      />
    </View>
  );
}

export default OngoingScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
    maxHeight: "60%",
  },
});
