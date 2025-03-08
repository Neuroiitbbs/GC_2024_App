import React, { useState, useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import TechCultEventCard from "../../Components/TechCultEventCard";
import { backend_link } from "../../utils/constants";
import Loader from "../../Components/Loader";
import axios from "axios";

import { Text } from "react-native";

const sortData = (data) => {
  console.log("data", data);

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
      new Date(a.data.details?.timestamp) - new Date(b.data.details?.timestamp) //sort by date ascending
    );
  });
  prevdata.sort((a, b) => {
    return (
      new Date(b.data.details?.timestamp) - new Date(a.data.details?.timestamp) //sort by date descending
    );
  });

  return nextdata.concat(prevdata);
};

const TechEventScreen = ({ navigation, search,reloader, techData}) => {
  const [filteredData, setFilteredData] = useState(techData);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [branchCoords, setBranchCoords] = useState({});
  

  useEffect(() => {
    console.log(search);
    if (search.length === 0 || !search) {
      setFilteredData(techData);
      return;
    }
    const data = techData.filter((item) => {
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

  // const onRefresh = async () => {
    // setRefreshing(true);
    // await fetchData();
    // setRefreshing(false);
  // };
  
  /* useEffect(() => {
    if (reloader === 1) {
      onRefresh();
    }
  }, [reloader, onRefresh]); */

  console.log("tech", techData);
  return (
    <View style={styles.eventsContainer}>
      <FlatList
        data={techData}
        renderItem={(itemData) => (
          <TechCultEventCard data={itemData} navigation={navigation} branchCoords = {branchCoords} />
        )}
        keyExtractor={(item, index) =>
          item.data.details.title + index
        }
        alwaysBounceVertical={false}
      />
    </View>
  );
};

export default TechEventScreen;

const styles = StyleSheet.create({
  eventsContainer: {
    flex: 5,
    maxHeight: "70%",
    // paddingTop: 10,
    // paddingBottom:20,
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


