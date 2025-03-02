import { useState, useEffect, useContext } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import UpcomingEventCard from "../../Components/UpcomingEventCard";
import Loader from "../../Components/Loader";
import { EventsContext } from "../../store/EventsContext";

const sortData = (data) => {
  return data.sort((a, b) => new Date(a.details.timestamp) - new Date(b.details.timestamp)); // Sort by date ascending
};

function UpcomingScreen({ search }) {
  const { upcomingEvents, isLoading } = useContext(EventsContext); // Get state directly
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (upcomingEvents.length > 0) {
      setFilteredData(sortData(upcomingEvents)); // Set state when events are loaded
    }
  }, [upcomingEvents]);

  useEffect(() => {
    if (!upcomingEvents.length) return; // Prevent unnecessary filtering if no data is available

    if (search.length === 0) {
      setFilteredData(sortData(upcomingEvents)); // Reset if search is empty
      return;
    }

    const data = upcomingEvents.filter((item) => {
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
  }, [search, upcomingEvents]);

  return (
    <View style={styles.eventsContainer}>
      <FlatList
        key={1}
        data={filteredData}
        renderItem={(itemData) => (
          <UpcomingEventCard
            details={itemData.item.details}
            gameName={itemData.item.gameName}
            id={itemData.item.id}
            teamA={itemData.item.teamA}
            teamB={itemData.item.teamB}
            scoreA={itemData.item.scoreA}
            scoreB={itemData.item.scoreB}
          />
        )}
        keyExtractor={(item, index) => item.id + index}
        alwaysBounceVertical={false}
      />
      <View style={{ minHeight: 0 }}>
        <Loader visible={isLoading} top={300} bottom={0} setModalVisible={() => {}} />
      </View>
    </View>
  );
}

export default UpcomingScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
    maxHeight: "60%",
  },
});