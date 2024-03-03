import TopMostCard from "../Components/TopMostCard";
import OngoingEventCard from "../Components/OngoingEventCard";
import { useState, useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { ScrollView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { View } from "react-native";
import axios from "axios";
//  {
//     gameName: 'Basketball',
//     id: 'Basketball',
//     teamA: 'ECE-META',
//     teamB: 'CSE',
//     scoreA: '4',
//     scoreB: '6'
// },
const back_link = "https://cp29bd07-3002.inc1.devtunnels.ms/";
function OngoingScreen(props) {
  const [ongoingEvents, setOngoingEvents] = useState([
    {
        gameName: 'Basketball',
        id: 'Basketball',
        teamA: 'ECE-META',
        teamB: 'CSE',
        scoreA: '4',
        scoreB: '6'
    },
    {
        gameName: 'Cricket',
        id: 'Cricket',
        teamA: 'ECE-META',
        teamB: 'CSE',
        scoreA: '4',
        scoreB: '6'
    },
    {
        gameName: 'Football',
        id: 'Football',
        teamA: 'ECE-META',
        teamB: 'CSE',
        scoreA: '4',
        scoreB: '6'
    },
    {
        gameName: 'Tennis',
        id: 'Tennis',
        teamA: 'ECE-META',
        teamB: 'CSE',
        scoreA: '4',
        scoreB: '6'
    },
  ]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          back_link + "api/event/getCurrentlyLiveEvents"
        );
        console.log(response.data);
        const data = response.data.events;
        const newData = data.map((item) => {
          const event = item.eventId;
          const teams = item.subEvents;
          console.log("teams", item);
          const newSubEvents = teams.map((item1) => {
            return {
              gameName: item1.data.details.title,
              id: item1.subEventId.split(" ").join(""),
              teamA: item1.subEventId.split(" vs ")[0],
              teamB: item1.subEventId.split(" vs ")[1],
            };
          });
          return newSubEvents;
        });
        console.log(newData.flat());
        setOngoingEvents(newData.flat());
      } catch (err) {
        console.log(err);
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
          return item.id;
        }}
        alwaysBounceVertical={false}
      />
    </View>
  );
}

export default OngoingScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
  },
});
