import { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import UpcomingEventCard from "../../Components/UpcomingEventCard";
import Loader from "../../Components/Loader";
import { backend_link } from "../../utils/constants";
import axios from "axios";

const sortData = (data) => {
  data.sort((a, b) => {
    return new Date(b.details.timestamp) - new Date(a.details.timestamp); //sort by date ascending
  });

  return data;
};
function PastScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/event/getPastEvents"
        );

        const data = response.data.events;
        let events = data.map((item) => {
          const eventName = item.eventId;
          const matches = item.subEvents;
          const match = matches.map((match_item) => {
            const matchId = match_item.subEventId;
            const matchData = match_item.data;
            const teamA = match_item.data.points
              ? match_item.data.points?.teamA
              : match_item.data.pointsTable?.teamA;
            const teamB = match_item.data.points
              ? match_item.data.points?.teamB
              : match_item.data.pointsTable?.teamB;
            return {
              details: match_item.data.details,
              status: match_item.data.status,
              gameName: eventName,
              id: matchId,
              teamA: teamA?.name || match_item.subEventId.split(" vs ")[0],
              teamB: teamB?.name || match_item.subEventId.split(" vs ")[1],
              scoreA: teamA?.points,
              scoreB: teamB?.points,
            };
          });
          return match;
        });
        events = sortData(events.flat());
        setUpcomingEvents(events.flat());
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        Alert.alert("Error", "Something went wrong");
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.eventsContainer}>
      <FlatList
        key={1}
        data={upcomingEvents}
        renderItem={(itemData) => {
          return (
            <UpcomingEventCard
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
      <View style={{ minheight: 60 }}>
        <Loader
          visible={isLoading}
          top={270}
          bottom={0}
          setModalVisible={setIsLoading}
        />
      </View>
    </View>
  );
}

export default PastScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
    maxHeight: "60%",
  },
});
