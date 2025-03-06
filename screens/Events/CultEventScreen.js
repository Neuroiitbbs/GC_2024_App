import { StyleSheet, View, FlatList} from "react-native";
import React, { useState, useEffect } from "react";
import TechCultEventCard from "../../Components/TechCultEventCard";
import axios from "axios";
import { backend_link } from "../../utils/constants";
import Loader from "../../Components/Loader";

import { Text } from "react-native";

const sortData = (data) => {
  let prevdata = [];
  let nextdata = [];
  data.map((item) => {
    if (
      new Date(item.data.details?.timestamp) >
      new Date() - 24 * 60 * 60 * 1000
    ) {
      nextdata.push(item);
    } else {
      prevdata.push(item);
    }
  });
  nextdata.sort((a, b) => {
    return (
      new Date(a.data.details?.timestamp) -
      new Date(b.data.details?.timestamp) //sort by date ascending
    );
  });
  prevdata.sort((a, b) => {
    return (
      new Date(b.data.details?.timestamp) -
      new Date(a.data.details?.timestamp) //sort by date descending
    );
  });

  return nextdata.concat(prevdata);
};

const CultEventScreen = ({ navigation, search }) => {
  const [cultEvents, setCultEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [branchCoords, setBranchCoords] = useState({});


  const fetchBranchCoords = async () => {
    try {
      console.log(`${backend_link}api/event/getBranchCoord`);
      const response = await axios.get(`${backend_link}api/event/getBranchCoord`);
      setBranchCoords(response.data.branch_coordinators);
    } catch (error) {
      console.log("error fetching in fetching branch coords", error);
    }
  }

  useEffect(() => {
    fetchBranchCoords();
  }, []);

  useEffect(() => {
    console.log(search);
    if (search.length == 0 || !search) {
      setFilteredData(cultEvents);
      return;
    }
    const data = cultEvents.filter((item) => {
      let title = item?.data?.details?.title.toLowerCase();
      let event = item?.data?.eventId.toLowerCase();
      const location = item?.data?.details?.location.toLowerCase();
      return (
        title?.includes(search.toLowerCase()) ||
        event?.includes(search.toLowerCase()) ||
        location?.includes(search.toLowerCase())
      );
    });
    setFilteredData(data);
  }, [search, dataLoaded]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        backend_link + "api/event/getEventByCategory?category=cult"
      );
      const data = response.data.events;
      let cultdata = [];
      data.map((item) => {
        item !== null && cultdata.push(item);
      });

      cultdata = sortData(cultdata);
      setCultEvents(cultdata);
      setDataLoaded(true);
      setFilteredData(cultdata);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  console.log("cult", cultEvents);
  return (
    <View style={styles.eventsContainer}>

      <Text style={styles.votingNote}>
        Note: The "First", "Second", and "Third" buttons in each card are for voting for the team that you expect to win.
      </Text>

      {loading && (
        <Loader
          visible={loading}
          top={300}
          bottom={0}
          setModalVisible={setLoading}
        />
      )}
      {!loading && (
        <FlatList
          data={filteredData}
          renderItem={(itemData) => {
            return (
              <TechCultEventCard data={itemData} navigation={navigation} branchCoords = {branchCoords}/>
            );
          }}
          keyExtractor={(item, index) => {
            return item.data.details.title + index;
          }}
          alwaysBounceVertical={false}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
};

export default CultEventScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
    maxHeight: "70%",
  },
  votingNote: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
    color: "#ffffff",
    paddingHorizontal: 30,
    paddingBottom: 30
  },
});

