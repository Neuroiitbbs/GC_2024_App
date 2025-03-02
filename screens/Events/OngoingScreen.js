import { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import OngoingEventCard from "../../Components/OngoingEventCard";
import Loader from "../../Components/Loader";
import { EventsContext } from "../../store/EventsContext"; // Import EventsContext

const sortData = (data) => {
  return data.sort((a, b) => new Date(a.details.timestamp) - new Date(b.details.timestamp)); // Sort by date ascending
};

function OngoingScreen({ search }) {
  const { liveEvents, isLoading } = useContext(EventsContext); // Get live events directly
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (liveEvents.length > 0) {
      setFilteredData(sortData(liveEvents)); // Update when events are loaded
    }
  }, [liveEvents]);

  useEffect(() => {
    if (!liveEvents.length) return; // Prevent filtering if no data is available

    if (search.length === 0) {
      setFilteredData(sortData(liveEvents)); // Reset if search is empty
      return;
    }

    const data = liveEvents.filter((item) => {
      let teamA = item?.teamA.toLowerCase();
      let teamB = item?.teamB.toLowerCase();
      let gameName = item?.gameName.toLowerCase();
      const id = item?.id.toLowerCase();

      return (
        teamA.includes(search.toLowerCase()) ||
        teamB.includes(search.toLowerCase()) ||
        gameName.includes(search.toLowerCase()) ||
        id.includes(search.toLowerCase())
      );
    });

    setFilteredData(sortData(data));
  }, [search, liveEvents]);

  return (
    <View style={styles.eventsContainer}>
      <FlatList
        key={1}
        data={filteredData}
        renderItem={({ item }) => (
          <OngoingEventCard
            details={item.details}
            gameName={item.gameName}
            id={item.id}
            teamA={item.teamA}
            teamB={item.teamB}
            scoreA={item.scoreA}
            scoreB={item.scoreB}
          />
        )}
        keyExtractor={(item, index) => item.id + index}
        alwaysBounceVertical={false}
      />
      <Loader visible={isLoading} top={300} bottom={0} setModalVisible={() => {}} />
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