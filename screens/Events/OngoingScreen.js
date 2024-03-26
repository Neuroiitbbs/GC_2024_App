import OngoingEventCard from "../../Components/OngoingEventCard";
import { useState, useEffect } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import axios from "axios";
import Loader from "../../Components/Loader";
import { backend_link } from "../../utils/constants";

const sortData = (data) => {
  data.sort((a, b) => {
    return new Date(a.details.timestamp) - new Date(b.details.timestamp); //sort by date ascending
  });

  return data;
};

function OngoingScreen(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [ongoingEvents, setOngoingEvents] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    console.log(props.search);
    if (props.search.length == 0) {
      setFilteredData(ongoingEvents);
      return;
    }
    const data = ongoingEvents.filter((item) => {
      let teamA = item?.teamA.toLowerCase();
      let teamB = item?.teamB.toLowerCase();
      let gameName = item?.gameName.toLowerCase();
      const id = item?.id.toLowerCase();
      return (
        teamA.includes(props.search.toLowerCase()) ||
        teamB.includes(props.search.toLowerCase()) ||
        gameName.includes(props.search.toLowerCase()) ||
        id.includes(props.search.toLowerCase())
      );
    });
    setFilteredData(data);
  }, [props.search, dataLoaded]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          backend_link + "api/event/getCurrentlyLiveEvents"
        );
        // console.log("response.data   ", response.data);
        const data = response.data.events;
        let events = data.map((item) => {
          const eventName = item.eventId; //ex. Football BOYS
          const subEvents = item.subEvents;
          const gameName = eventName;
          const match = subEvents.map((match_item) => {
            const teamA = match_item.data.points.teamA;
            const teamB = match_item.data.points.teamB;
            const details = match_item.data.details;

            return {
              details: details,
              status: match_item.data.status,
              gameName: gameName,
              id: match_item.subEventId,
              teamA: teamA?.name || match_item.subEventId.split(" vs ")[0],
              teamB: teamB?.name || match_item.subEventId.split(" vs ")[1],
              scoreA: teamA?.points,
              scoreB: teamB?.points,
            };
          });

          return match;
        });
        setIsLoading(false);

        events = sortData(events.flat());
        setOngoingEvents(events.flat());
        setFilteredData(events.flat());
        setDataLoaded(true);
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
        data={filteredData}
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
        top={300}
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
